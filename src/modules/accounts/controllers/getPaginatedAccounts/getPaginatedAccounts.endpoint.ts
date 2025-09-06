import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { GetAccountResponseDto } from './account-response.dto';
import { GetPaginatedAccountsHandler } from './getPaginatedAccounts.handler';
import { AccountQueryDto } from './account-query.dto';
import { PaginatedApiResponseDto } from '@commonTypes/common.types';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';

@Controller('accounts')
@ApiTags('Accounts')
@UseInterceptors(ResponseInterceptor)
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
