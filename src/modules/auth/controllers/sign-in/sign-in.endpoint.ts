import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { RequestWithUser } from '@commonTypes/request.type';
import { LocalAuthGuard } from '@modules/auth/guards/local.guard';
import { AuthService } from '@modules/auth/services/auth.service';
import {
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInHandler } from './sign-in.handler';

@Controller('auth')
@ApiTags('Authentication')
@UseInterceptors(ResponseInterceptor)
export class SignInEndpoint {
  constructor(
    private readonly signInHandler: SignInHandler,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Req() request: RequestWithUser) {
    const { user } = request;
    return this.signInHandler.execute(user.id);
  }
}
