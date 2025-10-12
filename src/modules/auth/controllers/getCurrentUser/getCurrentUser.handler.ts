import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '@modules/accounts/entities/account.entity';
import { GetCurrentUserResponseDto } from './getCurrentUser-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetCurrentUserHandler {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async execute(currentAccount: Account): Promise<GetCurrentUserResponseDto> {
    const account = await this.accountRepository.findOne({
      where: { id: currentAccount.id },
      relations: ['profile', 'roles'],
    });

    if (!account) {
      throw new Error('Account not found');
    }

    return plainToInstance(GetCurrentUserResponseDto, account, {
      excludeExtraneousValues: true,
    });
  }
}
