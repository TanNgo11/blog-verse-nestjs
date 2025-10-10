import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../../entities/file.entity';

@Injectable()
export class GetFilesByUserHandler {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async execute(uploadedBy: string): Promise<FileEntity[]> {
    return this.fileRepository.find({
      where: { uploadedBy, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }
}
