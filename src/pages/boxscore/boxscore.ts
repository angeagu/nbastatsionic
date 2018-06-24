import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {Team} from '../../beans/team';
import {DataCenterService} from "../../data/dataCenterService";

@Component({
  templateUrl: 'boxscore.html',
  providers: [DataCenterService]
})

export class BoxscoreView {
  team: Team;
  gameId: number;
  gameList: Array<string>;

  constructor(private navParams: NavParams, private dataCenterService:DataCenterService) {
    this.gameId = this.navParams.get('gameId');
    this.gameList = this.navParams.get('gameList');
    this.getBoxscore(this.gameId)
  }

  getBoxscore(gameId: number) {

  }

  previous() {
    alert('previous boxscore - TODO');
  }

  next() {
    alert('next boxscore - TODO');
  }

}
