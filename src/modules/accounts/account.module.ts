import { TransactionRunner } from '@common/transaction/transaction-runner';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as useCases from './controllers';
import { Account } from './entities/account.entity';
import { AccountRepository } from './repositories/account.repository';
import { AccountService } from './services/account.service';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));
const handlers = applications.filter((x) => x.name.endsWith('Handler'));

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [...endpoints],
  providers: [
    AccountRepository,
    AccountService,
    TransactionRunner,
    ...handlers,
  ],
  exports: [AccountService],
})
export class AccountModule {}
