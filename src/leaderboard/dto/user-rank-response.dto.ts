import { ApiProperty } from '@nestjs/swagger';
import { ScorerInformationSchema } from '../schema';

export class UserRankResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  rank: number;

  @ApiProperty()
  score: number;

  @ApiProperty()
  scorerInformation: ScorerInformationSchema;

  constructor(
    userId: string,
    rank: number,
    score: number,
    scorerInformation: ScorerInformationSchema,
  ) {
    this.userId = userId;
    this.rank = rank;
    this.score = score;
    this.scorerInformation = scorerInformation;
  }
}
