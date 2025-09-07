import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { TokenPayload } from '../dtos/token.dto';
import { refresh_token_public_key } from 'src/constraints/jwt.constraint';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh_token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: refresh_token_public_key,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    return await this.authService.getUserIfRefreshTokenMatched(
      payload.accountId,
      request?.headers?.authorization
        ? request.headers.authorization.split('Bearer ')[1]
        : '',
    );
  }
}
