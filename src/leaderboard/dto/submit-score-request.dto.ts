import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SubmitScoreRequestDto {
  @IsNumber()
  @ApiProperty()
  score: number;

  @IsString()
  @ApiProperty()
  gameId: string;
}
