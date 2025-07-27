import { Expose } from 'class-transformer';

export class GetRolesResponseDto {
  @Expose()
  id: string;

  @Expose()
  roleName: string;

  @Expose()
  description: string;
}
