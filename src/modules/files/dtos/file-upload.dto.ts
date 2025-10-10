import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileUploadResponseDto {
  @ApiProperty({
    description: 'File ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Original filename',
    example: 'document.pdf',
  })
  @Expose()
  filename: string;

  @ApiProperty({
    description: 'File key in storage',
    example: 'uploads/2025/01/08/document_uuid.pdf',
  })
  @Expose()
  key: string;

  @ApiProperty({
    description: 'Public URL to access the file',
    example:
      'https://s3.cloudfly.vn/blog-verse/uploads/2025/01/08/document_uuid.pdf',
  })
  @Expose()
  url: string;

  @ApiProperty({
    description: 'File MIME type',
    example: 'application/pdf',
  })
  @Expose()
  mimeType: string;

  @ApiProperty({
    description: 'File size in bytes',
    example: 1024576,
  })
  @Expose()
  size: number;

  @ApiProperty({
    description: 'Upload timestamp',
    example: '2025-01-08T10:30:00Z',
  })
  @Expose()
  createdAt: Date;
}

export class MultipleFileUploadResponseDto {
  @ApiProperty({
    description: 'Array of uploaded files',
    type: [FileUploadResponseDto],
  })
  @Expose()
  files: FileUploadResponseDto[];

  @ApiProperty({
    description: 'Total number of files uploaded',
    example: 3,
  })
  @Expose()
  totalFiles: number;
}
