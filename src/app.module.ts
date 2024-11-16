import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  EnvModule,
  MongoModule,
  PinoLoggerModule,
  RedisModule,
} from './shared';

@Module({
  imports: [EnvModule, PinoLoggerModule, RedisModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
