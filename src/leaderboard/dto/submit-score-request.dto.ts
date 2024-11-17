import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SubmitScoreRequestDto {
  @IsOptional()
  @IsString()
  userId: string;

  @IsNumber()
  score: number;

  @IsString()
  gameId: string;
}
