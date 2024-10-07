import { DataSource } from 'typeorm';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '**', 'migration', '*.{ts,js}')],
  synchronize: false,
});

export default connectionSource;
