import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from '@modules/auth/entities/refresh-token.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly configService: ConfigService,
  ) {}

  async setCurrentRefreshToken(
    id: string,
    hashed_token: string,
  ): Promise<void> {
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) throw new Error('Account not found');

    const refreshToken = this.refreshTokenRepository.create({
      token: hashed_token,
      account,
      createdAt: new Date(),
      expiresAt: this.configService.get<string>(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      ),
    });

    await this.refreshTokenRepository.save(refreshToken);
  }
}
