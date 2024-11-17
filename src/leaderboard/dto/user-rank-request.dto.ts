import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRankRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;
}
