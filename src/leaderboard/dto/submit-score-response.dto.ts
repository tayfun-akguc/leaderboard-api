import { ScoreOperations } from '../schema';

export class SubmitScoreResponseDto {
  userId: string;
  gameId: string;
  score: number;
  rank: number;
  submittedScore: number;
  operation: ScoreOperations;

  constructor(
    userId: string,
    gameId: string,
    score: number,
    rank: number,
    submittedScore: number,
    operation: ScoreOperations,
  ) {
    this.userId = userId;
    this.gameId = gameId;
    this.score = score;
    this.rank = rank;
    this.submittedScore = submittedScore;
    this.operation = operation;
  }
}
