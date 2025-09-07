import { AuthService } from '@modules/auth/services/auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignInHandler {
  constructor(private readonly authService: AuthService) {}

  execute(accountId: string) {
    return this.authService.signIn(accountId);
  }
}
