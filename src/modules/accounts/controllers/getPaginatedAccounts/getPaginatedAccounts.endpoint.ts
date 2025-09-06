import { Controller, Get, Query } from '@nestjs/common';
import { GetAccountResponseDto } from './account-response.dto';
import { GetPaginatedAccountsHandler } from './getPaginatedAccounts.handler';
import { AccountQueryDto } from './account-query.dto';
import { PaginatedApiResponseDto } from '@commonTypes/common.types';

@Controller('accounts')
export class GetPaginatedAccountsEndpoint {
  constructor(
    private readonly getPaginatedAccountsHandler: GetPaginatedAccountsHandler,
  ) {}

  @Get()
  getAll(
    @Query() query: AccountQueryDto,
  ): Promise<PaginatedApiResponseDto<GetAccountResponseDto[]>> {
    return this.getPaginatedAccountsHandler.execute(query);
  }
}
