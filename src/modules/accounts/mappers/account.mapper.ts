import { plainToInstance } from 'class-transformer';
import { SignUpRequestDTO } from '../controllers/signUp/signUp.request.dto';
import { Account } from '../entities/account.entity';
import { Profile } from '@modules/profiles/entities/profile.entity';

export function mapSignUpDtoToAccount(dto: SignUpRequestDTO): Account {
  const profile = plainToInstance(Profile, dto.profile);
  const account = plainToInstance(Account, {
    ...dto,
    profile,
  });
  return account;
}
