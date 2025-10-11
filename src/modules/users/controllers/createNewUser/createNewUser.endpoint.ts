import { RoleService } from '@modules/roles/services/role.service';
import { Body, Controller, Post } from '@nestjs/common';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { Role } from '@modules/roles/entities/role.entity';

class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  roleName: string;

  @IsOptional()
  @IsString()
  description?: string;
}

@Controller('roles')
export class UsersEndpoint {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() roleDTO: CreateRoleDto) {
    // CreateRoleDto is validated by the controller's ValidationPipe. Cast
    // to DeepPartial<Role> to satisfy the RoleService.create signature.
    return this.roleService.create(roleDTO as DeepPartial<Role>);
  }
}
