import { RoleService } from '@modules/roles/services/role.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('roles')
export class UsersEndpoint {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() roleDTO: any) {
    return this.roleService.create(roleDTO);
  }
}
