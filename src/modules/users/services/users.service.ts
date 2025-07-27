import { Injectable } from '@nestjs/common';
import { DeepPartial, EntityManager } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { BaseServiceAbstract } from '@baseServices/base.abstract.service';
import { SignUpRequestDTO } from '@modules/accounts/controllers/signUp/signUp.request.dto';

@Injectable()
export class UsersService extends BaseServiceAbstract<User> {
  signUp(dto: SignUpRequestDTO, manager: EntityManager) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly users_repository: UsersRepository) {
    super(users_repository);
  }

  async create(createUserDto: DeepPartial<User>): Promise<User> {
    createUserDto.username = createUserDto.username?.toUpperCase();

    return await super.create(createUserDto);
  }
}
