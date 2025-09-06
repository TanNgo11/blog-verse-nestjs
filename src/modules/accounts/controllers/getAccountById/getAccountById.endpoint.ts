import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { GetAccountByIdResponseDto } from './getAccountById-response.dto';
import { GetAccountByIdHandler } from './getAccountById.handler';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('accounts')
@ApiTags('Accounts')
@UseInterceptors(ResponseInterceptor)
export class GetAccountByIdEndpoint {
  constructor(private readonly getAccountByIdHandler: GetAccountByIdHandler) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get account details by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'Account UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'Account found',
    type: GetAccountByIdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Account not found' })
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<GetAccountByIdResponseDto> {
    return this.getAccountByIdHandler.execute(id);
  }
}
