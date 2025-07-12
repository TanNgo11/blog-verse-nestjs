import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './configs/database.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config_service = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);
  const database_env = config_service.get<DatabaseConfig>('database');
  const port = config_service.get<number>('PORT');
  const node_env = config_service.get<string>('NODE_ENV');
  logger.log(`Running in ${node_env} mode`);
  logger.log(`Listening on port ${port}`);
  logger.debug(database_env);
  await app.listen(3000);
}
bootstrap();
