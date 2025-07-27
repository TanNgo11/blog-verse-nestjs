import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as useCases from './controllers';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [...endpoints],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
