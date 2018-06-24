import {Team} from './team';
import {Stats} from './stats';

export class Player {
  personal: {
    ID: number
    FirstName: string
    LastName: string
  };
  team: Team
  stats: Stats
  playoffStats: Stats

  constructor() {
    this.personal = {
      ID: 0,
      FirstName: '',
      LastName: ''
    }
    this.team = null
    this.stats = new Stats()
    this.playoffStats = new Stats()
  }

}
