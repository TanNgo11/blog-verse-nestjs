import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { RequestWithUser } from '@commonTypes/request.type';
import { JwtRefreshTokenGuard } from '@modules/auth/guards/jwt-refresh-token.guard';
import {
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RefreshHandler } from './refresh.handler';

@Controller('auth')
@ApiTags('Authentication')
@UseInterceptors(ResponseInterceptor)
export class RefreshEndpoint {
  constructor(private readonly refreshHandler: RefreshHandler) {}

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh')
  refreshAccessToken(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessToken = this.refreshHandler.execute(user.id);
    return {
      accessToken,
    };
  }
}
