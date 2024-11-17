import { ScoreOperations } from './score-operations.enum';

export class ScoreSchema {
  member: string;
  score: number;
  operation?: ScoreOperations;
}
