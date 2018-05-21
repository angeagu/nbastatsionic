export class Favorite {
  id:number;
  name: string;
  type: string;
  readonly PLAYER: 'PLAYER';
  readonly TEAM: 'TEAM';

  constructor(id: number, name: string, type: string) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

}
