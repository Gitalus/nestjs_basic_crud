import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('orm.config', () => ({
  type: 'mongodb',
  useUnifiedTopology: true,
  url: process.env.DB_HOST,
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  synchronize: false,
  logging: false,
}));
