import { Injectable } from '@nestjs/common';

import { BaseServiceAbstract } from '@baseServices/base.abstract.service';
import { GetRolesResponseDto } from '../controllers/getRoles/getRoles.response.dto';
import { Role } from '../entities/role.entity';
import { mapArrayToDto } from '../helpers/dto.helper';
import { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class RoleService extends BaseServiceAbstract<Role> {
  constructor(private readonly roleRepository: RoleRepository) {
    super(roleRepository);
  }

  async getAllRoles(): Promise<GetRolesResponseDto[]> {
    const roles = await this.findAll();
    return mapArrayToDto(GetRolesResponseDto, roles);
  }
}
