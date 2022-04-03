import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // To make config for every module
      // ignoreEnvFile: true, // if config env are from docker or something like that
      // envFilePath: '.env', // by default is .env
      load: [ormConfig],
      expandVariables: true, // allows to use env on .env using ${}
    }), // loads variable from .env
    MongooseModule.forRootAsync({
      useFactory:
        process.env.NODE_EN !== 'production' ? ormConfig : ormConfigProd,
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
