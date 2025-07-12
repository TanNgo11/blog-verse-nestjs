// src/configs/database.config.ts
export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  uri: string;
}

export const database_config = () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '5432'),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    uri: process.env.DATABASE_URI,
  },
});
