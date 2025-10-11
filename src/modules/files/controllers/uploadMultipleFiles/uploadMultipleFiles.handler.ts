import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { generateFileKey } from '@common/helpers/file-key.helper';
import { FileEntity } from '../../entities/file.entity';
import {
  FileUploadResponseDto,
  MultipleFileUploadResponseDto,
} from '../../dtos/file-upload.dto';
import { StorageService } from '@modules/storage/services/storage.service';

@Injectable()
export class UploadMultipleFilesHandler {
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
        return this.fileRepository.save(fileEntity);
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

  // using shared generateFileKey helper
}
