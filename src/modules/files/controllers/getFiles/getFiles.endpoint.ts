import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { FileEntity } from '../../entities/file.entity';
import { GetFilesHandler } from './getFiles.handler';

@Controller('files')
@ApiTags('File Management')
@UseInterceptors(ResponseInterceptor)
export class GetFilesEndpoint {
  constructor(private readonly getFilesHandler: GetFilesHandler) {}

  @Get()
  @ApiOperation({ summary: 'Get all active files' })
  @ApiResponse({
    status: 200,
    description: 'List of active files',
    type: [FileEntity],
  })
  async getAllFiles(): Promise<FileEntity[]> {
    return await this.getFilesHandler.execute();
  }
}
