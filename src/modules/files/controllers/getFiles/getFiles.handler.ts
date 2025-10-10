import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../../entities/file.entity';

@Injectable()
export class GetFilesHandler {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async execute(): Promise<FileEntity[]> {
    return this.fileRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }
}
