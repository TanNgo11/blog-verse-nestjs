import { Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/common/services/base/base.abstract.service';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { DeepPartial } from 'typeorm';

@Injectable()
export class UsersService extends BaseServiceAbstract<User> {
  constructor(private readonly users_repository: UsersRepository) {
    super(users_repository);
  }

  async create(createUserDto: DeepPartial<User>): Promise<User> {
    createUserDto.username = createUserDto.username?.toUpperCase();

    return await super.create(createUserDto);
  }
}
