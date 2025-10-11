import { generateFileKey } from '@common/helpers/file-key.helper';
import { StorageService } from '@modules/storage/services/storage.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { FileUploadResponseDto } from '../../dtos/file-upload.dto';
import { FileEntity } from '../../entities/file.entity';

@Injectable()
export class UploadFileHandler {
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
    private readonly storageService: StorageService,
  ) {}

  async execute(
    file: Express.Multer.File,
    uploadedBy?: string,
  ): Promise<FileUploadResponseDto> {
    this.validateFile(file);

    const key = generateFileKey(file.originalname);

    const url = await this.storageService.uploadFile(
      key,
      file.buffer,
      file.mimetype,
    );

    try {
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
    } catch (error) {
      try {
        await this.storageService.deleteFile(key);
      } catch (deleteError) {
        console.error(
          'Failed to cleanup uploaded file after database error:',
          deleteError,
        );
      }
      throw new BadRequestException(
        'Failed to save file information to database',
      );
    }
  }

  private validateFile(file: Express.Multer.File): void {
    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File size exceeds maximum allowed size of ${
          this.maxFileSize / (1024 * 1024)
        }MB`,
      );
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type ${file.mimetype} is not allowed. Allowed types: ${this.allowedMimeTypes.join(', ')}`,
      );
    }
  }

  // using shared generateFileKey helper from common/helpers
}
