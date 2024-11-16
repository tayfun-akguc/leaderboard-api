import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule, PinoLoggerModule } from './shared';

@Module({
  imports: [EnvModule, PinoLoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
