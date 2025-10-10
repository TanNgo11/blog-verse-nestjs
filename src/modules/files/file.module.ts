import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from '@modules/storage/storage.module';
import { TransactionRunner } from '@common/transaction/transaction-runner';
import { FileEntity } from './entities/file.entity';
import { FileService } from './services/file.service';
import * as useCases from './controllers';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));
const handlers = applications.filter((x) => x.name.endsWith('Handler'));

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), StorageModule],
  controllers: [...endpoints],
  providers: [FileService, TransactionRunner, ...handlers],
  exports: [FileService],
})
export class FileModule {}
