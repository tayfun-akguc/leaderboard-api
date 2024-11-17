import { ScorerInformationSchema } from '../schema';

export class UserRankResponseDto {
  userId: string;
  rank: number;
  score: number;
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
