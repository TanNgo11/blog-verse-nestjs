import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiQuery,
} from '@nestjs/swagger';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { FileUploadResponseDto } from '../../dtos/file-upload.dto';
import { UploadFileHandler } from './uploadFile.handler';
import 'multer';

@Controller('files')
@ApiTags('File Management')
@UseInterceptors(ResponseInterceptor)
export class UploadFileEndpoint {
  constructor(private readonly uploadFileHandler: UploadFileHandler) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a single file' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'uploadedBy',
    required: false,
    type: String,
    description: 'ID of the user uploading the file',
  })
  @ApiResponse({
    status: 201,
    description: 'File uploaded successfully',
    type: FileUploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - no file provided' })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('uploadedBy') uploadedBy?: string,
  ): Promise<FileUploadResponseDto> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    return await this.uploadFileHandler.execute(file, uploadedBy);
  }
}
