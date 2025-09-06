import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';

const env = process.env.NODE_ENV ?? 'development';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    env === 'development' ? '.env.dev' : env === 'test' ? '.env.test' : '.env',
  ),
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../database/migrations/*.{ts,js}'],
  synchronize: false,
  logging: true,
  logger: 'formatted-console',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
