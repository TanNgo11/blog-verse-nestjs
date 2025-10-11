import { generateFileKey } from '@common/helpers/file-key.helper';
import { StorageService } from '@modules/storage/services/storage.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import {
  FileUploadResponseDto,
  MultipleFileUploadResponseDto,
} from '../dtos/file-upload.dto';
import { FileEntity } from '../entities/file.entity';

@Injectable()
export class FileService {
  private readonly maxFileSize = 10 * 1024 * 1024; // 10MB
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    @Inject(forwardRef(() => StorageService))
    private readonly storageService: StorageService,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    uploadedBy?: string,
  ): Promise<FileUploadResponseDto> {
    this.validateFile(file);

    const key = generateFileKey(file.originalname);

    // Upload to storage
    const url = await this.storageService.uploadFile(
      key,
      file.buffer,
      file.mimetype,
    );

    // Save to database
    const fileEntity = this.fileRepository.create({
      filename: file.originalname,
      key,
      url,
      mimeType: file.mimetype,
      size: file.size,
      uploadedBy,
      isActive: true,
    });

    const savedFile = await this.fileRepository.save(fileEntity);

    return plainToInstance(FileUploadResponseDto, savedFile, {
      excludeExtraneousValues: true,
    });
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    uploadedBy?: string,
  ): Promise<MultipleFileUploadResponseDto> {
    // Validate all files first
    files.forEach((file) => this.validateFile(file));

    // Prepare file data for upload
    const fileData = files.map((file) => ({
      key: generateFileKey(file.originalname),
      buffer: file.buffer,
      contentType: file.mimetype,
      originalFile: file,
    }));

    // Upload all files to storage
    const urls = await this.storageService.uploadMultiple(
      fileData.map((f) => ({
        key: f.key,
        buffer: f.buffer,
        contentType: f.contentType,
      })),
    );

    // Save all files to database
    const fileEntities = await Promise.all(
      fileData.map(async (fileInfo, index) => {
        const fileEntity = this.fileRepository.create({
          filename: fileInfo.originalFile.originalname,
          key: fileInfo.key,
          url: urls[index],
          mimeType: fileInfo.originalFile.mimetype,
          size: fileInfo.originalFile.size,
          uploadedBy,
          isActive: true,
        });
        return await this.fileRepository.save(fileEntity);
      }),
    );

    const uploadedFiles = fileEntities.map((file) =>
      plainToInstance(FileUploadResponseDto, file, {
        excludeExtraneousValues: true,
      }),
    );

    return plainToInstance(
      MultipleFileUploadResponseDto,
      {
        files: uploadedFiles,
        totalFiles: uploadedFiles.length,
      },
      { excludeExtraneousValues: true },
    );
  }

  async deleteFile(key: string): Promise<{ message: string }> {
    const fileEntity = await this.fileRepository.findOne({
      where: { key, isActive: true },
    });
    if (!fileEntity) {
      throw new NotFoundException('File not found');
    }

    // Delete from storage
    await this.storageService.deleteFile(key);

    // Soft delete from database
    await this.fileRepository.update({ key }, { isActive: false });

    return { message: 'File deleted successfully' };
  }

  async getFileByKey(key: string): Promise<FileEntity> {
    const file = await this.fileRepository.findOne({
      where: { key, isActive: true },
    });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  async getFilesByUser(uploadedBy: string): Promise<FileEntity[]> {
    return await this.fileRepository.find({
      where: { uploadedBy, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getAllActiveFiles(): Promise<FileEntity[]> {
    return await this.fileRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  private validateFile(file: Express.Multer.File): void {
    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File size exceeds maximum allowed size of ${this.maxFileSize / (1024 * 1024)}MB`,
      );
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type ${file.mimetype} is not allowed. Allowed types: ${this.allowedMimeTypes.join(', ')}`,
      );
    }
  }

  // use shared generateFileKey helper
}
