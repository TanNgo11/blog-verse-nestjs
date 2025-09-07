import { Account } from '@modules/accounts/entities/account.entity';
import { AccountService } from '@modules/accounts/services/account.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { TokenPayload } from '../dtos/token.dto';
import {
  access_token_private_key,
  refresh_token_private_key,
} from 'src/constraints/jwt.constraint';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly accountService: AccountService,
  ) {}

  async getAuthenticatedUser(
    username: string,
    password: string,
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { username: username },
    });
    if (!account) {
      throw new BadRequestException('Wrong credentials!!');
    }
    await this.verifyPlainContentWithHashedContent(password, account.password);
    return account;
  }

  private async verifyPlainContentWithHashedContent(
    plain_text: string,
    hashed_text: string,
  ) {
    const is_matching = await bcrypt.compare(plain_text, hashed_text);
    if (!is_matching) {
      throw new BadRequestException();
    }
  }

  generateAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      privateKey: access_token_private_key,
      // secret: 'access_token_secret',
      expiresIn: `${this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      privateKey: refresh_token_private_key,
      // secret: 'refresh_token_secret',
      expiresIn: `${this.configService.get<string>(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }

  async signIn(accountId: string) {
    const access_token = this.generateAccessToken({
      accountId,
    });
    const refresh_token = this.generateRefreshToken({
      accountId,
    });
    await this.storeRefreshToken(accountId, refresh_token);
    return {
      access_token,
      refresh_token,
    };
  }

  async storeRefreshToken(accountId: string, token: string): Promise<void> {
    const hashed_token = this.hashToken(token);
    await this.accountService.setCurrentRefreshToken(accountId, hashed_token);
  }

  hashToken(token: string): string {
    return crypto
      .createHmac('sha256', refresh_token_private_key)
      .update(token)
      .digest('hex');
  }

  async getUserIfRefreshTokenMatched(
    accountId: string,
    refresh_token: string,
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
      relations: ['refreshTokens'],
    });

    if (!account) {
      throw new UnauthorizedException();
    }

    const hashedToken = this.hashToken(refresh_token);

    const match = account.refreshTokens.some((rt) => rt.token === hashedToken);

    if (!match) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return account;
  }
}
