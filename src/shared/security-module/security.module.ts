import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvironmentVariables } from '../env-module';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '5m',
          },
        };
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class SecurityModule {}
