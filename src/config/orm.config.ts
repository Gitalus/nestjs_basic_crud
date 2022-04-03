import { registerAs } from '@nestjs/config';

export default registerAs('orm.config', () => ({
  uri: process.env.DB_HOST,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}));
