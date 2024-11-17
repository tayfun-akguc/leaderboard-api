import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthRequestDto, AuthResponseDto, Payload } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async localSignUp(authRequestDto: AuthRequestDto) {
    const user = await this.userService.createUser({ ...authRequestDto });
    const payload: Payload = { sub: user.id, username: user.username };
    const accessToken = await this.createAccessToken(payload);

    return new AuthResponseDto(accessToken);
  }

  public async localSignIn(
    authRequestDto: AuthRequestDto,
  ): Promise<AuthResponseDto> {
    const { username } = authRequestDto;
    const user = await this.userService.findUser(username);
    const payload: Payload = { sub: user.id, username: user.username };
    const accessToken = await this.createAccessToken(payload);

    return new AuthResponseDto(accessToken);
  }

  private async createAccessToken(payload: Payload) {
    return await this.jwtService.signAsync(payload);
  }
}
