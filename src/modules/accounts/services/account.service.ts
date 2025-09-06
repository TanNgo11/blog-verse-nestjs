import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
}
