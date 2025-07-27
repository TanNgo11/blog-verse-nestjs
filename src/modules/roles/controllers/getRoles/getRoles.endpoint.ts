import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { RoleService } from '@modules/roles/services/role.service';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetRolesResponseDto } from './getRoles.response.dto';

@Controller('roles')
@ApiTags('Roles')
@UseInterceptors(ResponseInterceptor)
export class GetRolesEndpoint {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAllRoles(): Promise<GetRolesResponseDto[]> {
    return this.roleService.getAllRoles();
  }
}
