import {Team} from './team';

export class Player {
  personal: object;
  team: object;
  stats: {
    games: number;
    minutes: number;
    fgm: number;
    fga: number;
    fgPct: number;
    fg3m: number;
    fg3a: number;
    fg3Pct: number;
    ftm: number;
    fta: number;
    ftPct: number;
    oreb: number;
    dreb: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    points: number;
    efficiency: number;
    fouls: number;
    assistsPerTurnover: number;
    stealsPerTurnover: number;
  }
  playoffStats: {
    games: number;
    minutes: number;
    fgm: number;
    fga: number;
    fgPct: number;
    fg3m: number;
    fg3a: number;
    fg3Pct: number;
    ftm: number;
    fta: number;
    ftPct: number;
    oreb: number;
    dreb: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    points: number;
    efficiency: number;
    fouls: number;
    assistsPerTurnover: number;
    stealsPerTurnover: number;
  }

  constructor() {
    this.personal = {};
    this.team = new Team();
    this.stats = {
      games: 0,
      minutes: 0,
      fgm: 0,
      fga: 0,
      fgPct: 0,
      fg3m: 0,
      fg3a: 0,
      fg3Pct: 0,
      ftm: 0,
      fta: 0,
      ftPct: 0,
      oreb: 0,
      dreb: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      points: 0,
      efficiency: 0,
      fouls: 0,
      assistsPerTurnover: 0,
      stealsPerTurnover: 0
    }
    this.playoffStats = {
      games: 0,
      minutes: 0,
      fgm: 0,
      fga: 0,
      fgPct: 0,
      fg3m: 0,
      fg3a: 0,
      fg3Pct: 0,
      ftm: 0,
      fta: 0,
      ftPct: 0,
      oreb: 0,
      dreb: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
      points: 0,
      efficiency: 0,
      fouls: 0,
      assistsPerTurnover: 0,
      stealsPerTurnover: 0
    }

  }

}
