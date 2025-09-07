import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { PaginatedApiResponseDto } from '@commonTypes/common.types';
import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt-access-token.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { RoleName } from '@modules/roles/enums/role.enums';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorators';
import { AccountQueryDto } from './account-query.dto';
import { GetAccountResponseDto } from './account-response.dto';
import { GetPaginatedAccountsHandler } from './getPaginatedAccounts.handler';

@Controller('accounts')
@ApiTags('Accounts')
@UseInterceptors(ResponseInterceptor)
export class GetPaginatedAccountsEndpoint {
  constructor(
    private readonly getPaginatedAccountsHandler: GetPaginatedAccountsHandler,
  ) {}

  @Get()
  @Roles(RoleName.USER)
  @UseGuards(JwtAccessTokenGuard, RolesGuard)
  @ApiOperation({ summary: 'Get paginated list of accounts' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of records per page (default: 10)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    example: 'john',
    description: 'Search by username or profile full name',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved paginated list of accounts',
    type: PaginatedApiResponseDto<GetAccountResponseDto>,
  })
  getAll(
    @Query() query: AccountQueryDto,
  ): Promise<PaginatedApiResponseDto<GetAccountResponseDto[]>> {
    return this.getPaginatedAccountsHandler.execute(query);
  }
}
