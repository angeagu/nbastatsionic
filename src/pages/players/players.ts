import { Component } from '@angular/core';
import {DataCenterService} from '../../data/dataCenterService';
import {Player} from '../../beans/player';

@Component({
  templateUrl: 'players.html',
  providers: [DataCenterService]
})
export class PlayersView {

  private playerList: Player[];

  constructor(private dataCenterService: DataCenterService) {
    this.createSortedPlayerMap();
  }

  createSortedPlayerMap() {
    this.dataCenterService.getActivePlayers().subscribe(data => {
      // console.log ('datarrr')
      // console.log (JSON.stringify(data))
      this.playerList = data;
    });
  }

}
