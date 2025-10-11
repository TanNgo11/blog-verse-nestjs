import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetPresignedDownloadHandler } from './getPresignedDownload.handler';
import { ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('File Management')
export class GetPresignedDownloadEndpoint {
  constructor(private readonly handler: GetPresignedDownloadHandler) {}

  @Get('presign/download/:key')
  async handle(
    @Param('key') key: string,
    @Query('expiresIn') expiresIn?: string,
  ) {
    const seconds = expiresIn ? Number(expiresIn) : undefined;
    return this.handler.execute(key, seconds);
  }
}
