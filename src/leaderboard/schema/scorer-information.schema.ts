export class ScorerInformationSchema {
  gameId: string;
  isoDate: string;
  username: string;

  constructor(username: string, gameId: string, isoDate: string) {
    this.username = username;
    this.gameId = gameId;
    this.isoDate = isoDate;
  }
}
