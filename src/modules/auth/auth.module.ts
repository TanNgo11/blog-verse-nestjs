import { Account } from '@modules/accounts/entities/account.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as useCases from './controllers';
import { TransactionRunner } from '@common/transaction/transaction-runner';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AccountModule } from '@modules/accounts/account.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));
const handlers = applications.filter((x) => x.name.endsWith('Handler'));

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Account]),
  ],
  controllers: [...endpoints],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    TransactionRunner,
    ...handlers,
  ],
  exports: [],
})
export class AuthModule {}
