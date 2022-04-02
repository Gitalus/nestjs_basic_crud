import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mongodb',
    useUnifiedTopology: true,
    url: process.env.DB_HOST,
    entities: [join(__dirname, '../**/**.entity{.ts,.js}')],
    synchronize: true,
    logging: false,
  }),
);
