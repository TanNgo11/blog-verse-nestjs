import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../../entities/file.entity';
import { StorageService } from '@modules/storage/services/storage.service';

@Injectable()
export class GetPresignedDownloadHandler {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly storageService: StorageService,
  ) {}

  async execute(key: string, expiresIn?: number): Promise<{ url: string }> {
    const file = await this.fileRepository.findOne({
      where: { key, isActive: true },
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    const url = await this.storageService.getPresignedUrl(
      key,
      expiresIn ?? 3600,
    );

    return { url };
  }
}
