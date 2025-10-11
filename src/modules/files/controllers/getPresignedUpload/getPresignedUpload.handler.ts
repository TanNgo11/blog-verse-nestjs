import { StorageService } from '@modules/storage/services/storage.service';
import { Injectable } from '@nestjs/common';
import { PresignedUploadDto } from './dto/presigned-upload.dto';
import { generateFileKey } from '@common/helpers/file-key.helper';

@Injectable()
export class GetPresignedUploadHandler {
  constructor(private readonly storageService: StorageService) {}

  async execute(
    dto: PresignedUploadDto,
  ): Promise<{ key: string; url: string }> {
    const originalName = dto.filename;
    const expiresIn = dto.expiresIn;
    const contentType = dto.contentType;

    const key = generateFileKey(originalName);

    const url = await this.storageService.getPresignedUploadUrl(
      key,
      expiresIn ?? 3600,
      contentType,
    );

    return { key, url };
  }
}
