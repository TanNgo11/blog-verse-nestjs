import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { database_config, DatabaseConfig } from '@configs/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@modules/users';
import { RoleModule } from '@modules/roles/role.module';
import { AccountModule } from '@modules/accounts/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
      load: [database_config],
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision', 'staging')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_URI: Joi.string().uri().required(),
      }),
      validationOptions: {
        abortEarly: false,
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const {
          host,
          port,
          username,
          password,
          name: database,
          uri: url,
        } = configService.get<DatabaseConfig>('database')!;

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          url,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, //Chỉ dùng trong dev
          logging: process.env.NODE_ENV === 'development',
        };
      },
    }),
    AccountModule,
    // UsersModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
