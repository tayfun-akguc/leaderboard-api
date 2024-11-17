import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { TransportMultiOptions } from 'pino';
import { EnvironmentVariables } from '../env-module';

@Global()
@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        const transportTargets: TransportMultiOptions = {
          targets: [],
        };
        switch (configService.get('NODE_ENV')) {
          case 'PROD':
            transportTargets['targets'] = [
              {
                target: '@logtail/pino',
                options: {
                  sourceToken: configService.get('BETTERSTACK_SOURCE_TOKEN'),
                },
              },
            ];
            break;
          default:
            transportTargets['targets'] = [
              {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                },
              },
            ];
        }

        return {
          pinoHttp: {
            transport: transportTargets,
          },
        };
      },
    }),
  ],
})
export class PinoLoggerModule {}
