import { BaseServiceAbstract } from '@baseServices/base.abstract.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SignUpRequestDTO } from '../controllers/signUp/signUp.request.dto';
import { Account } from '../entities/account.entity';
import { mapSignUpDtoToAccount } from '../mappers/account.mapper';
import { AccountRepository } from '../repositories/account.repository';

@Injectable()
export class AccountService extends BaseServiceAbstract<Account> {
  constructor(private readonly accountRepository: AccountRepository) {
    super(accountRepository);
  }

  async signUp(
    signUpDto: SignUpRequestDTO,
    manager?: EntityManager,
  ): Promise<Account> {
    const existing = await this.accountRepository.existsByUsername(
      signUpDto.username,
    );
    if (existing) throw new BadRequestException('Username already exists');

    const account = mapSignUpDtoToAccount(signUpDto);
    return this.accountRepository.save(account, manager);
  }
}
