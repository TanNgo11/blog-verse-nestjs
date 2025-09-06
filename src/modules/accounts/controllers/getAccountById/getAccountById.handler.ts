import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '@modules/accounts/entities/account.entity';
import { GetAccountByIdResponseDto } from './getAccountById-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetAccountByIdHandler {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async execute(id: string): Promise<GetAccountByIdResponseDto> {
    const account = await this.accountRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    return plainToInstance(GetAccountByIdResponseDto, account, {
      excludeExtraneousValues: true,
    });
  }
}
