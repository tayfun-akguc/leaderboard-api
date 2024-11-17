import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { REDIS_TOKEN, RedisClient } from 'src/shared';
import {
  ScoreOperations,
  ScorerInformationSchema,
  ScoreSchema,
} from './schema';

@Injectable()
export class ScoreStorageService implements OnModuleInit {
  private static LEADERBOARD_KEY = 'leaderboard';
  constructor(@Inject(REDIS_TOKEN) private readonly redis: RedisClient) {}

  async saveScore(
    member: string,
    score: number,
    gameId: string,
    username: string,
  ): Promise<ScoreSchema> {
    const currentScore = await this.getScore(member);
    if (currentScore && currentScore > score) {
      return {
        member: member,
        score: currentScore,
        operation: ScoreOperations.NOT_MODIFIED,
      };
    }
    await this.redis.zadd(ScoreStorageService.LEADERBOARD_KEY, score, member);
    await this.saveScorerInformation(
      member,
      new ScorerInformationSchema(username, gameId, new Date().toISOString()),
    );
    return {
      member: member,
      score: score,
      operation: ScoreOperations.UPDATED,
    };
  }

  async getScore(member: string): Promise<number | null> {
    const score = await this.redis.zscore(
      ScoreStorageService.LEADERBOARD_KEY,
      member,
    );
    return score ? +score : null;
  }

  async getRank(member: string): Promise<number | null> {
    const rank = await this.redis.zrevrank(
      ScoreStorageService.LEADERBOARD_KEY,
      member,
    );
    if (typeof rank === 'number') {
      return rank + 1;
    }
    return null;
  }

  async saveScorerInformation(
    member: string,
    scorerInformation: ScorerInformationSchema,
  ) {
    const { username, gameId, isoDate } = scorerInformation;
    return await this.redis.hset(member, {
      gameId: gameId,
      date: isoDate,
      username: username,
    });
  }

  async getScorerInformation(member: string): Promise<ScorerInformationSchema> {
    const scorerInformation: ScorerInformationSchema =
      (await this.redis.hgetall(member)) as unknown as ScorerInformationSchema;
    console.log(scorerInformation);
    return scorerInformation;
  }

  async onModuleInit() {
    await this.getScorerInformation('6739fc31218e288efa5ac081');
  }
}
