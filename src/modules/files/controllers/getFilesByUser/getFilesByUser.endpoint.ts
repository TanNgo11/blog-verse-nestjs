import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { FileEntity } from '../../entities/file.entity';
import { GetFilesByUserHandler } from './getFilesByUser.handler';

@Controller('files')
@ApiTags('File Management')
@UseInterceptors(ResponseInterceptor)
export class GetFilesByUserEndpoint {
  constructor(private readonly getFilesByUserHandler: GetFilesByUserHandler) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get files uploaded by a specific user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'List of files uploaded by user',
    type: [FileEntity],
  })
  async getFilesByUser(@Param('userId') userId: string): Promise<FileEntity[]> {
    return await this.getFilesByUserHandler.execute(userId);
  }
}
