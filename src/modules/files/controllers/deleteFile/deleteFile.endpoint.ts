import { Controller, Delete, Param, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { DeleteFileHandler } from './deleteFile.handler';

@Controller('files')
@ApiTags('File Management')
@UseInterceptors(ResponseInterceptor)
export class DeleteFileEndpoint {
  constructor(private readonly deleteFileHandler: DeleteFileHandler) {}

  @Delete(':key')
  @ApiOperation({ summary: 'Delete a file by key' })
  @ApiParam({ name: 'key', description: 'File key' })
  @ApiResponse({
    status: 200,
    description: 'File deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'File not found' })
  async deleteFile(@Param('key') key: string): Promise<{ message: string }> {
    return await this.deleteFileHandler.execute(key);
  }
}
