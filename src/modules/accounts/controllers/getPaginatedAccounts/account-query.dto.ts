import { PaginationQueryDto } from '@commonTypes/common.types';
import { IsOptional, IsString } from 'class-validator';

export class AccountQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}
