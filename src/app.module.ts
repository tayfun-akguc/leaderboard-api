import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  EnvModule,
  MongoModule,
  PinoLoggerModule,
  RedisModule,
} from './shared';
import { UserModule } from './user/user.module';

@Module({
  imports: [EnvModule, PinoLoggerModule, RedisModule, MongoModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
