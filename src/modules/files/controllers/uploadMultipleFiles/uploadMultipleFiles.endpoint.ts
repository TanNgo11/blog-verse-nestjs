import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiQuery,
} from '@nestjs/swagger';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { MultipleFileUploadResponseDto } from '../../dtos/file-upload.dto';
import { UploadMultipleFilesHandler } from './uploadMultipleFiles.handler';

@Controller('files')
@ApiTags('File Management')
@UseInterceptors(ResponseInterceptor)
export class UploadMultipleFilesEndpoint {
  constructor(
    private readonly uploadMultipleFilesHandler: UploadMultipleFilesHandler,
  ) {}

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10)) // Maximum 10 files
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'uploadedBy',
    required: false,
    type: String,
    description: 'ID of the user uploading the files',
  })
  @ApiResponse({
    status: 201,
    description: 'Files uploaded successfully',
    type: MultipleFileUploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - no files provided' })
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('uploadedBy') uploadedBy?: string,
  ): Promise<MultipleFileUploadResponseDto> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }
    return await this.uploadMultipleFilesHandler.execute(files, uploadedBy);
  }
}
