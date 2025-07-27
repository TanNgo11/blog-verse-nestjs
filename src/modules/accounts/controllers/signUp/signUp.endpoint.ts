import { SetMessage } from '@common/decorators/set-message.decorator';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignUpRequestDTO } from './signUp.request.dto';
import { SignUpHandler } from './signUp.handler';

@Controller('auth')
@ApiTags('Authentication')
@UseInterceptors(ResponseInterceptor)
export class SignUpEndpoint {
  constructor(private readonly signUpHandler: SignUpHandler) {}

  @Post('signup')
  @SetMessage('Account created successfully')
  async create(@Body() signUpRequest: SignUpRequestDTO) {
    await this.signUpHandler.execute(signUpRequest);
  }
}
