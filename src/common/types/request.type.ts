import { Account } from '@modules/accounts/entities/account.entity';

export interface RequestWithUser extends Request {
  user: Account;
}
