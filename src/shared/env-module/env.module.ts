import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  EnvironmentValidationSchema,
  ValidationOptions,
} from './environment-validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      validationSchema: EnvironmentValidationSchema,
      validationOptions: ValidationOptions,
    }),
  ],
})
export class EnvModule {}
