import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryInterface } from './users.repository.interface';
import { BaseRepositoryAbstract } from '@baseRepositories/base.abstract.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository
  extends BaseRepositoryAbstract<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }
}
