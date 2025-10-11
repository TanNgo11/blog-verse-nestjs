import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PresignedUploadDto {
  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsOptional()
  @IsString()
  @Matches(new RegExp('^[^/\\s]+/[^/\\s]+$'), {
    message: 'contentType must be a valid MIME type',
  })
  contentType?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(60)
  @Max(86400)
  expiresIn?: number;
}
