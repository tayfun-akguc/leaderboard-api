import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  UserRankRequestDto,
  SubmitScoreRequestDto,
  SubmitScoreResponseDto,
} from './dto';
import { JwtGuard } from 'src/auth/guard';
import { LeaderboardService } from './leaderboard.service';
import { UserRankResponseDto } from './dto/user-rank-response.dto';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post('submit-score')
  @UseGuards(JwtGuard)
  async submitScore(
    @Body() submitScoreRequestDto: SubmitScoreRequestDto,
  ): Promise<SubmitScoreResponseDto> {
    const response = await this.leaderboardService.submitScore(
      submitScoreRequestDto,
    );
    return response;
  }

  @Get('rank')
  async getUserRank(
    @Query() userRankRequestDto: UserRankRequestDto,
  ): Promise<UserRankResponseDto> {
    const response =
      await this.leaderboardService.getUserRank(userRankRequestDto);

    return response;
  }
}
