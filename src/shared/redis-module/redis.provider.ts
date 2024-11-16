import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';
import { EnvironmentVariables } from '../env-module';
import { Logger } from 'nestjs-pino';

export type RedisClient = Redis;

export const REDIS_TOKEN = Symbol('REDIS_TOKEN');

export const RedisProvider: FactoryProvider = {
  provide: REDIS_TOKEN,
  inject: [ConfigService, Logger],
  useFactory: (
    configService: ConfigService<EnvironmentVariables>,
    logger: Logger,
  ): RedisClient => {
    const redisOptions: RedisOptions = {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
      connectTimeout: configService.get('REDIS_CONNECT_TIMEOUT'),
      username: configService.get('REDIS_USERNAME'),
      password: configService.get('REDIS_PASSWORD'),
    };

    if (configService.get('NODE_ENV') === 'PROD') {
      redisOptions.tls = {};
    }
    const redisClient = new Redis(redisOptions);

    redisClient.on('connect', () => {
      logger.log('Connected to redis!');
    });

    redisClient.on('close', () => {
      logger.log('Redis connection closed');
    });
    return redisClient;
  },
};
