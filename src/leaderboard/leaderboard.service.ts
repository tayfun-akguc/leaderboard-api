import { Inject, Injectable } from '@nestjs/common';
import {
  SubmitScoreRequestDto,
  SubmitScoreResponseDto,
  UserRankRequestDto,
} from './dto';
import { Als, ALS_TOKEN } from 'src/shared';
import { ScoreStorageService } from './score-storage.service';
import { UserRankResponseDto } from './dto/user-rank-response.dto';

@Injectable()
export class LeaderboardService {
  constructor(
    @Inject(ALS_TOKEN) private readonly als: Als,
    private readonly scoreStorageService: ScoreStorageService,
  ) {}

  async submitScore(
    submitScoreRequestDto: SubmitScoreRequestDto,
  ): Promise<SubmitScoreResponseDto> {
    const { userId, username } = this.als.getStore();
    const { score, gameId } = submitScoreRequestDto;
    const savedScore = await this.scoreStorageService.saveScore(
      userId,
      score,
      gameId,
      username,
    );
    const rank = await this.scoreStorageService.getRank(userId);

    return {
      userId: userId,
      gameId: submitScoreRequestDto.gameId,
      submittedScore: submitScoreRequestDto.score,
      operation: savedScore.operation,
      score: savedScore.score,
      rank: rank,
    };
  }

  async getUserRank(
    userRankRequestDto: UserRankRequestDto,
  ): Promise<UserRankResponseDto> {
    const { userId } = userRankRequestDto;
    const rank = await this.scoreStorageService.getRank(userId);
    const score = await this.scoreStorageService.getScore(userId);
    const scorerInformation =
      await this.scoreStorageService.getScorerInformation(userId);
    return new UserRankResponseDto(userId, rank, score, scorerInformation);
  }
}
