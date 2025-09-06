import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAccountProfileDto } from './updateAccountById-request.dto';
import { UpdateAccountProfileHandler } from './updateAccountById.handler';

@Controller('accounts')
@ApiTags('Accounts')
@UseInterceptors(ResponseInterceptor)
export class UpdateAccountProfileEndpoint {
  constructor(
    private readonly updateAccountProfileHandler: UpdateAccountProfileHandler,
  ) {}

  @Put(':id')
  @ApiOperation({ summary: 'Update profile information of an account' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'Account UUID',
  })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  updateAccountProfile(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdateAccountProfileDto,
  ) {
    return this.updateAccountProfileHandler.execute(id, body);
  }
}
