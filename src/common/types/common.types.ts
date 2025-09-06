import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
export class PaginatedApiResponseDto<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

export class ApiResponseDto<T = void> {
  success: boolean;
  code: number;
  data?: T;
  timestamp: number;
}

export class ApiListResponseDto<T> {
  success: boolean;
  code: number;
  data: T[];
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
