import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto, AuthResponseDto } from './dto';
import { LocalGuard } from './guard';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: AuthResponseDto,
    description: 'Sign-up Response',
  })
  @HttpCode(200)
  @Post('local/sign-up')
  public async localSignUp(
    @Body() authRequestDto: AuthRequestDto,
  ): Promise<AuthResponseDto> {
    const response = await this.authService.localSignUp(authRequestDto);
    return response;
  }

  @ApiOkResponse({
    type: AuthResponseDto,
    description: 'Sign-in Response',
  })
  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('local/sign-in')
  public async localSignIn(@Body() authRequestDto: AuthRequestDto) {
    const response = await this.authService.localSignIn(authRequestDto);
    return response;
  }
}
