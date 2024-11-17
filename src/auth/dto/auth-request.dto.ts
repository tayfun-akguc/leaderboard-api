import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto';

export class AuthRequestDto extends PickType(CreateUserDto, [
  'username',
  'password',
] as const) {}
