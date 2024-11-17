import { Module } from '@nestjs/common';
import {
  AlsModule,
  EnvModule,
  MongoModule,
  PinoLoggerModule,
  RedisModule,
  SecurityModule,
} from './shared';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [
    EnvModule,
    PinoLoggerModule,
    RedisModule,
    MongoModule,
    SecurityModule,
    UserModule,
    AuthModule,
    AlsModule,
    LeaderboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
