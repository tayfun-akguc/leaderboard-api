import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from '../dto';
import { Als, ALS_TOKEN } from 'src/shared';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ALS_TOKEN) private readonly als: Als) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwt-secret',
    });
  }

  validate(payload: Payload) {
    const { sub, username } = payload;
    this.als.getStore().userId = sub;
    this.als.getStore().username = username;
    return payload;
  }
}
