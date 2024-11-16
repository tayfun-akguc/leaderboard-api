import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [],
      useFactory: () => {
        return {
          pinoHttp: {
            transport: {
              targets: [
                {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                },
              ],
            },
          },
        };
      },
    }),
  ],
})
export class PinoLoggerModule {}
