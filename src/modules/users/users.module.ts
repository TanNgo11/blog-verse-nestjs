import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as useCases from './controllers';
import { UsersRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [...endpoints],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
