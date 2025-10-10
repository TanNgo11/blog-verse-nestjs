import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';
import * as path from 'path';
import { FileEntity } from '../../entities/file.entity';
import { FileUploadResponseDto } from '../../dtos/file-upload.dto';
import { StorageService } from '@modules/storage/services/storage.service';

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

    const key = this.generateFileKey(file.originalname);

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

  private generateFileKey(originalName: string): string {
    const extension = path.extname(originalName);
    const filename = path.basename(originalName, extension);
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9-_]/g, '_');
    const uuid = randomUUID();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `uploads/${year}/${month}/${day}/${sanitizedFilename}_${uuid}${extension}`;
  }
}
