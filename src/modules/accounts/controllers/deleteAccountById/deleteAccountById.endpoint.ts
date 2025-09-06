import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import {
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteAccountHandler } from './deleteAccountById.handler';

@Controller('accounts')
@ApiTags('Accounts')
@UseInterceptors(ResponseInterceptor)
export class DeleteAccountEndpoint {
  constructor(private readonly deleteAccountHandler: DeleteAccountHandler) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an account by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'Account UUID',
  })
  @ApiResponse({ status: 200, description: 'Account deleted successfully' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  deleteAccount(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.deleteAccountHandler.execute(id);
  }
}
