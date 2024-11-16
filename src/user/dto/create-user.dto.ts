import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsStrongPassword } from 'class-validator';

export class CreateUserDto extends PickType(UserDto, ['username'] as const) {
  @IsStrongPassword({
    minLength: 4,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  @ApiProperty()
  password: string;

  constructor(username: string, password: string) {
    super(null, username, null, null);
    this.password = password;
  }
}
