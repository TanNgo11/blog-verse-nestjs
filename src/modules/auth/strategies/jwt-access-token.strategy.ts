import { Account } from '@modules/accounts/entities/account.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { TokenPayload } from '../dtos/token.dto';
import { access_token_public_key } from 'src/constraints/jwt.constraint';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: access_token_public_key,
    });
  }

  async validate(payload: TokenPayload) {
    return await this.accountRepository.findOne({
      where: { id: payload.accountId },
      relations: ['roles'],
    });
  }
}
