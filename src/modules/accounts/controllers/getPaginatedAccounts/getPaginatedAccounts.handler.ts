import { Account } from '@modules/accounts/entities/account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { GetAccountResponseDto } from './account-response.dto';
import { plainToInstance } from 'class-transformer';
import { PaginatedApiResponseDto } from '@commonTypes/common.types';
import { AccountQueryDto } from './account-query.dto';

@Injectable()
export class GetPaginatedAccountsHandler {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async execute(
    query: AccountQueryDto,
  ): Promise<PaginatedApiResponseDto<GetAccountResponseDto[]>> {
    const { page, limit, search } = query;
    const skip = (page - 1) * limit;

    const where = search ? [{ username: ILike(`%${search}%`) }] : undefined;

    const [accounts, total] = await this.accountRepository.findAndCount({
      relations: ['profile'],
      where,
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    const results = plainToInstance(GetAccountResponseDto, accounts, {
      excludeExtraneousValues: true,
    });

    return {
      data: results,
      metadata: {
        total,
        page,
        limit,
        hasNext: total > page * limit,
      },
    };
  }
}
