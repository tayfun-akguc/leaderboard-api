import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto';
import { JwtGuard, LocalGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/sign-up')
  public async localSignUp(@Body() authRequestDto: AuthRequestDto) {
    const response = await this.authService.localSignUp(authRequestDto);
    return response;
  }

  @UseGuards(LocalGuard)
  @Post('local/sign-in')
  public async localSignIn(@Body() authRequestDto: AuthRequestDto) {
    const response = await this.authService.localSignIn(authRequestDto);
    return response;
  }

  @Get()
  @UseGuards(JwtGuard)
  public getSomething() {
    return { msg: 'something' };
  }
}
