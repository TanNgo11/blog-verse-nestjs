import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '@modules/accounts/entities/account.entity';
import { UpdateAccountProfileDto } from './updateAccountById-request.dto';

@Injectable()
export class UpdateAccountProfileHandler {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async execute(id: string, body: UpdateAccountProfileDto): Promise<void> {
    const account = await this.accountRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!account)
      throw new NotFoundException(`Account with id ${id} not found`);

    Object.assign(account.profile, body);
    await this.accountRepository.save(account);
  }
}
