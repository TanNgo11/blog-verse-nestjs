import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { RequestWithUser } from '@commonTypes/request.type';
import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt-access-token.guard';
import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserResponseDto } from './getCurrentUser-response.dto';
import { GetCurrentUserHandler } from './getCurrentUser.handler';

@Controller('auth')
@ApiTags('Authentication')
@UseInterceptors(ResponseInterceptor)
export class GetCurrentUserEndpoint {
  constructor(private readonly getCurrentUserHandler: GetCurrentUserHandler) {}

  @Get('me')
  @UseGuards(JwtAccessTokenGuard)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Current user profile retrieved successfully',
    type: GetCurrentUserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getCurrentUser(
    @Req() request: RequestWithUser,
  ): Promise<GetCurrentUserResponseDto> {
    console.log(
      '🚀 ~ GetCurrentUserEndpoint ~ getCurrentUser ~ request:',
      request,
    );
    return this.getCurrentUserHandler.execute(request.user);
  }
}
