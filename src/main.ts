import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './configs/database.config';
import { json, urlencoded } from 'express';
import * as compression from 'compression';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import { GlobalExceptionFilter } from './exceptions/exception-filters/global-exception.filter';
import { configSwagger } from '@configs/api-docs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable DI for class-validator (before anything uses class-validator)
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // 2. Security middleware (helmet, compression, body parser)
  app.use(helmet());
  app.use(compression());
  app.use(json({ limit: '2mb' }));
  app.use(urlencoded({ extended: true }));

  // 3. CORS and API versioning
  app.enableCors();
  app.enableVersioning();

  // 4. Global Pipes (ValidationPipe)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  // 5. Global Filters (Exception filter)
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(ConfigService)));

  // 6. Swagger should come after filters/pipes to reflect correct metadata
  configSwagger(app);

  // 7. Logger setup and app start
  const configService = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);
  const dbConfig = configService.get<DatabaseConfig>('database');
  const port = configService.get<number>('PORT');
  const nodeEnv = configService.get<string>('NODE_ENV');

  logger.log(`Running in ${nodeEnv} mode`);
  logger.log(`Listening on port ${port}`);
  logger.debug(dbConfig);

  await app.listen(port || 3000);
}
bootstrap();
