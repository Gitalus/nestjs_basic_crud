import { registerAs } from '@nestjs/config';
import { join } from 'path';

// TODO: Change it to work with @nestjs/mongoose instead of typeorm mondodb
export default registerAs('orm.config', () => ({
  type: 'mongodb',
  useUnifiedTopology: true,
  url: process.env.DB_HOST,
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  synchronize: false,
  logging: false,
}));
