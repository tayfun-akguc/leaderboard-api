import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule, PinoLoggerModule, RedisModule } from './shared';

@Module({
  imports: [EnvModule, PinoLoggerModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
