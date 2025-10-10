import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { FileEntity } from '../../entities/file.entity';
import { GetFileByKeyHandler } from './getFileByKey.handler';

@Controller('files')
@ApiTags('File Management')
@UseInterceptors(ResponseInterceptor)
export class GetFileByKeyEndpoint {
  constructor(private readonly getFileByKeyHandler: GetFileByKeyHandler) {}

  @Get(':key')
  @ApiOperation({ summary: 'Get file details by key' })
  @ApiParam({ name: 'key', description: 'File key' })
  @ApiResponse({
    status: 200,
    description: 'File details',
    type: FileEntity,
  })
  @ApiResponse({ status: 404, description: 'File not found' })
  async getFileByKey(@Param('key') key: string): Promise<FileEntity> {
    return await this.getFileByKeyHandler.execute(key);
  }
}
