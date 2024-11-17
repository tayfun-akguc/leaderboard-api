import { ApiProperty } from '@nestjs/swagger';
import { ScorerInformationSchema } from '../schema';

export class TopListResponseDto {
  @ApiProperty()
  rank: number;

  @ApiProperty()
  score: number;

  @ApiProperty()
  scorerInformation: ScorerInformationSchema;
}
