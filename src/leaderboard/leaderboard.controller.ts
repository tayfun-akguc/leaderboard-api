import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  UserRankRequestDto,
  SubmitScoreRequestDto,
  SubmitScoreResponseDto,
  TopListRequestDto,
  TopListResponseDto,
} from './dto';
import { JwtGuard } from 'src/auth/guard';
import { LeaderboardService } from './leaderboard.service';
import { UserRankResponseDto } from './dto/user-rank-response.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @ApiResponse({
    type: SubmitScoreResponseDto,
    description: 'Submit score',
    status: 201,
  })
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

  @ApiResponse({
    type: UserRankResponseDto,
    description: 'Get user rank',
    status: 200,
  })
  @Get('rank')
  async getUserRank(
    @Query() userRankRequestDto: UserRankRequestDto,
  ): Promise<UserRankResponseDto> {
    const response =
      await this.leaderboardService.getUserRank(userRankRequestDto);

    return response;
  }

  @ApiResponse({
    type: TopListResponseDto,
    description: 'Get top players',
    status: 200,
  })
  @Get('top')
  async getTopList(
    @Query() topListRequestDto: TopListRequestDto,
  ): Promise<TopListResponseDto[]> {
    const response =
      await this.leaderboardService.getTopList(topListRequestDto);
    return response;
  }
}
