import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  EnvModule,
  MongoModule,
  PinoLoggerModule,
  RedisModule,
  SecurityModule,
} from './shared';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EnvModule,
    PinoLoggerModule,
    RedisModule,
    MongoModule,
    SecurityModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
