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
  //* Use the date to tie break when scores are same
  private readonly epochalypse = new Date('2038-01-19T03:14:07').getTime();

  constructor(@Inject(REDIS_TOKEN) private readonly redis: RedisClient) {}

  async saveScore(
    member: string,
    score: number,
    gameId: string,
    username: string,
  ) {
    const currentScore = await this.getScore(member);
    if (currentScore !== null && score <= currentScore) {
      return {
        member: member,
        score: currentScore,
        operation: ScoreOperations.NOT_MODIFIED,
      };
    }
    //* For Optimistic Lock
    await this.redis.watch(ScoreStorageService.LEADERBOARD_KEY);
    const trx = this.redis.multi();
    await trx.zadd(
      ScoreStorageService.LEADERBOARD_KEY,
      this.applyTieBreak(score),
      //* score,
      member,
    );
    await trx.hset(member, {
      gameId: gameId,
      date: new Date().toISOString(),
      username: username,
    });
    //* Manually wait to test optimistic lock
    //* await new Promise((resolve) => setTimeout(resolve, 10000));
    const result = await trx.exec();
    if (result === null) {
      return {
        member: member,
        score: score,
        operation: ScoreOperations.FAILED,
      };
    }
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
    return score ? this.undoTieBreak(+score) : null;
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
    return scorerInformation;
  }

  async paginateScores(startIndex: number, endIndex: number) {
    const scores = await this.redis.zrevrange(
      ScoreStorageService.LEADERBOARD_KEY,
      startIndex,
      endIndex,
      'WITHSCORES',
    );

    const membersWithScore: ScoreSchema[] = [];
    for (let i = 0; i < scores.length; i += 2) {
      membersWithScore.push({
        member: scores[i],
        score: this.undoTieBreak(+scores[i + 1]),
      });
    }

    return membersWithScore;
  }

  private applyTieBreak(score: number): number {
    return parseFloat(`${score}.${this.epochalypse - Date.now()}`);
  }

  private undoTieBreak(score: number): number {
    return Math.floor(score);
  }

  async onModuleInit() {
    /*
    await this.saveScore('c', 101, 'gameId', 'username');
    await this.saveScore('d', 101, 'gameId', 'username');
    await this.saveScore('a', 101, 'gameId', 'username');
    await this.saveScore('b', 101, 'gameId', 'username');
    */
  }
}
