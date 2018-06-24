import { Component } from '@angular/core';
import {DataCenterService} from '../../data/dataCenterService';
import {Player} from '../../beans/player';

@Component({
  templateUrl: 'players.html',
  providers: [DataCenterService]
})
export class PlayersView {

  private playerList: Player[];
  isReady: boolean = false;

  constructor(private dataCenterService: DataCenterService) {
    this.createSortedPlayerMap();
  }

  createSortedPlayerMap() {
    this.dataCenterService.getActivePlayers().subscribe(data => {
      this.playerList = data;
      this.isReady = true;
    });
  }

}
