import { Inject, Injectable } from '@nestjs/common';
import {
  SubmitScoreRequestDto,
  SubmitScoreResponseDto,
  TopListRequestDto,
  TopListResponseDto,
  UserRankRequestDto,
  UserRankResponseDto,
} from './dto';
import { Als, ALS_TOKEN } from 'src/shared';
import { ScoreStorageService } from './score-storage.service';
import { ScoreSchema } from './schema';

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

  async getTopList(topListRequestDto: TopListRequestDto) {
    const { page, limit } = topListRequestDto;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;
    const scores: ScoreSchema[] = await this.scoreStorageService.paginateScores(
      startIndex,
      endIndex,
    );

    const topList: TopListResponseDto[] = [];
    for (let i = 0; i < scores.length; i++) {
      const { member, score } = scores[i];
      const scorerInformation =
        await this.scoreStorageService.getScorerInformation(member);
      const rank = await this.scoreStorageService.getRank(member);
      topList.push({
        rank: rank,
        score: score,
        scorerInformation: scorerInformation,
      });
    }
    return topList;
  }
}
