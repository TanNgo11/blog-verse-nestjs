import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetPresignedUploadHandler } from './getPresignedUpload.handler';
import { PresignedUploadDto } from './dto/presigned-upload.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('File Management')
export class GetPresignedUploadEndpoint {
  constructor(private readonly handler: GetPresignedUploadHandler) {}

  @Post('presign/upload')
  @UsePipes(new ValidationPipe({ transform: true }))
  async handle(@Body() dto: PresignedUploadDto) {
    return this.handler.execute(dto);
  }
}
