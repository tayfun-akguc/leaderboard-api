import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { AuthModule } from 'src/auth/auth.module';
import { ScoreStorageService } from './score-storage.service';

@Module({
  imports: [AuthModule],
  controllers: [LeaderboardController],
  providers: [LeaderboardService, ScoreStorageService],
})
export class LeaderboardModule {}
