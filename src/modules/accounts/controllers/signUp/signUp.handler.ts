import { TransactionRunner } from '@common/transaction/transaction-runner';
import { Account } from '@modules/accounts/entities/account.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignUpRequestDTO } from './signUp.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '@modules/profiles/entities/profile.entity';

@Injectable()
export class SignUpHandler {
  constructor(
    private readonly transaction: TransactionRunner,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async execute(dto: SignUpRequestDTO): Promise<Account> {
    const existing = await this.accountRepository.exists({
      where: { username: dto.username },
    });

    if (existing) {
      throw new BadRequestException('Username already exists');
    }

    return this.transaction.run(async (manager) => {
      const accountRepo = manager.getRepository(Account);
      const profileRepo = manager.getRepository(Profile);
      const profile = profileRepo.create(dto.profile);
      const account = accountRepo.create({
        username: dto.username,
        password: dto.password,
        email: dto.email,
        profile,
      });

      return await accountRepo.save(account);
    });
  }
}
