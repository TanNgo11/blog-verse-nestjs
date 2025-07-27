import { RoleService } from '@modules/roles/services/role.service';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateRoleRequestDTO } from './createRole.request.dto';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { SetMessage } from '@common/decorators/set-message.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('Roles')
@UseInterceptors(ResponseInterceptor)
export class UsersEndpoint {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @SetMessage('Role created successfully')
  async create(@Body() createUserDto: CreateRoleRequestDTO) {
    await this.roleService.create(createUserDto);
  }
}
