import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../../entities/file.entity';

@Injectable()
export class GetFileByKeyHandler {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async execute(key: string): Promise<FileEntity> {
    const file = await this.fileRepository.findOne({
      where: { key, isActive: true },
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }
}
