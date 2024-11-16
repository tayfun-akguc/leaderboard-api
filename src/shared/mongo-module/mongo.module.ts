import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from 'nestjs-pino';
import { EnvironmentVariables } from '../env-module';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService, Logger],
      useFactory: (
        configService: ConfigService<EnvironmentVariables>,
        logger: Logger,
      ) => {
        return {
          uri: configService.get('MONGO_CONNECTION_URI'),
          onConnectionCreate: (connection: Connection) => {
            connection.on('connected', () => {
              logger.log('connected to mongodb!');
            });

            connection.on('disconnected', () => {
              logger.log('disconnected to mongodb!');
            });
          },
        };
      },
    }),
  ],
})
export class MongoModule {}
