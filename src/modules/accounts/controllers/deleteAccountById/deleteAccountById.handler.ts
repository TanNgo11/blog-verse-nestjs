import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '@modules/accounts/entities/account.entity';

@Injectable()
export class DeleteAccountHandler {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async execute(id: string): Promise<void> {
    const account = await this.accountRepository.findOne({ where: { id } });
    if (!account)
      throw new NotFoundException(`Account with id ${id} not found`);

    await this.accountRepository.softDelete(id);
  }
}
