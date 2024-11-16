import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UserDto {
  id: string;

  @IsString()
  @MinLength(2)
  @ApiProperty()
  username: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(id: string, username: string, createdAt: Date, updateAt: Date) {
    this.id = id;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updateAt;
  }
}
