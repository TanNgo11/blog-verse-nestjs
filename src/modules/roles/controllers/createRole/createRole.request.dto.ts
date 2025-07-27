import { RoleName } from '@modules/roles/enums/role.enums';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleRequestDTO {
  @IsString()
  @IsNotEmpty()
  roleName: RoleName;

  @IsOptional()
  @IsString()
  description?: string;

  //   @IsArray()
  //   @ArrayNotEmpty()
  //   @IsString({ each: true })
  //   permissions: string[];
}
