import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../../entities/file.entity';
import { StorageService } from '@modules/storage/services/storage.service';

@Injectable()
export class DeleteFileHandler {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly storageService: StorageService,
  ) {}

  async execute(key: string): Promise<{ message: string }> {
    const fileEntity = await this.fileRepository.findOne({
      where: { key, isActive: true },
    });

    if (!fileEntity) {
      throw new NotFoundException('File not found');
    }

    await this.storageService.deleteFile(key);

    await this.fileRepository.update({ key }, { isActive: false });

    return { message: 'File deleted successfully' };
  }
}
