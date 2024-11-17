import { ApiProperty } from '@nestjs/swagger';

export class ScorerInformationSchema {
  @ApiProperty()
  gameId: string;

  @ApiProperty()
  isoDate: string;

  @ApiProperty()
  username: string;

  constructor(username: string, gameId: string, isoDate: string) {
    this.username = username;
    this.gameId = gameId;
    this.isoDate = isoDate;
  }
}
