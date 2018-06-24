import {Team} from './team';

export class Game {
  id:number;
  home: Team;
  away: Team;
  date: string;

  constructor(id: number, home:Team, away: Team, date: string) {
    this.id = id;
    this.home = home
    this.away = away;
    this.date = date;
  }

}
