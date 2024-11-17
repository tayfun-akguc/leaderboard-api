import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy, LocalStrategy } from './strategy';
import { JwtGuard, LocalGuard } from './guard';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtGuard, LocalGuard],
  exports: [JwtStrategy, JwtGuard],
})
export class AuthModule {}
