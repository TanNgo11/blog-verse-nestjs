import { Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from '@baseServices/base.abstract.service';
import { Profile } from '../entities/profile.entity';
import { ProfileRepository } from '../repositories/profile.repository';

@Injectable()
export class ProfileService extends BaseServiceAbstract<Profile> {
  constructor(private readonly ProfileRepository: ProfileRepository) {
    super(ProfileRepository);
  }
}
