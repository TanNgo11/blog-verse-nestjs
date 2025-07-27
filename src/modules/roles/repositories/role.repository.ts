import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepositoryAbstract } from '@baseRepositories/base.abstract.repository';
import { RoleRepositoryInterface } from './role.repository.interface';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository
  extends BaseRepositoryAbstract<Role>
  implements RoleRepositoryInterface
{
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }
}
