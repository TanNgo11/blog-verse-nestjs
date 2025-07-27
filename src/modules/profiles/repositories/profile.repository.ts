import { BaseRepositoryAbstract } from '@baseRepositories/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { ProfileRepositoryInterface } from './profile.repository.interface';

@Injectable()
export class ProfileRepository
  extends BaseRepositoryAbstract<Profile>
  implements ProfileRepositoryInterface
{
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {
    super(profileRepository);
  }
}
