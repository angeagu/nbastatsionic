export class Favorite {

  static readonly PLAYER: 'PLAYER';
  static readonly TEAM: 'TEAM';

  id:number;
  name: string;
  type: string;

  constructor(id: number, name: string, type: string) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

}
