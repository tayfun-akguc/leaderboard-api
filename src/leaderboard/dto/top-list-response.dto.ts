import { ScorerInformationSchema } from '../schema';

export class TopListResponseDto {
  rank: number;
  score: number;
  scorerInformation: ScorerInformationSchema;
}
