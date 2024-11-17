import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class SubmitScoreRequestDto {
  @IsNumber()
  @ApiProperty()
  @Min(0)
  score: number;

  @IsString()
  @ApiProperty()
  gameId: string;
}
