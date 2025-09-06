import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
export class PaginatedApiResponseDto<T> {
  data: T;
  metadata: {
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
  };
}

export class ApiResponseDto<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
  timestamp: number;
}

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;
}
