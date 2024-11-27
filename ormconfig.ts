import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const ormOptions: DataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: ['dist/src/models/*.entity.{ts,js}'],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'schema_migrations',
});
