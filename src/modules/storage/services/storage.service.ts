import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private s3: S3Client | null = null;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.bucket = this.configService.get<string>('S3_BUCKET') || '';
  }

  private getS3(): S3Client {
    if (!this.s3) {
      this.s3 = new S3Client({
        // region: this.configService.get<string>('S3_REGION') ?? 'ap-southeast-1',
        endpoint: this.configService.get<string>('S3_ENDPOINT'),
        credentials: {
          accessKeyId: this.configService.get<string>('S3_ACCESS_KEY_ID') ?? '',
          secretAccessKey:
            this.configService.get<string>('S3_SECRET_ACCESS_KEY') ?? '',
        },
        forcePathStyle: true,
      });
    }
    return this.s3;
  }

  async uploadFile(key: string, file: Buffer, contentType?: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file,
        ContentType: contentType,
      });
      await this.getS3().send(command);

      const endpoint = this.configService.get<string>('S3_ENDPOINT');
      return `${endpoint}/${this.bucket}/${key}`;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to upload file to S3: ${errorMessage}`);
    }
  }

  async uploadMultiple(
    files: { key: string; buffer: Buffer; contentType?: string }[],
  ) {
    return Promise.all(
      files.map((f) => this.uploadFile(f.key, f.buffer, f.contentType)),
    );
  }

  async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
      await this.getS3().send(command);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to delete file from S3: ${errorMessage}`);
    }
  }
}
