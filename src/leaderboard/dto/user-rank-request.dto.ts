import { IsNotEmpty, IsString } from 'class-validator';

export class UserRankRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
