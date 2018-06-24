import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import {Player} from '../../beans/player';
import {DataCenterService} from '../../data/dataCenterService';
import {PlayerDetailView} from "../playerDetail/playerDetail";

@Component({
  templateUrl: 'leadersDetail.html',
  providers: [DataCenterService]
})

export class LeadersDetailView {

  private playerList: object[];
  private filteredPlayerList: Player[];
  private category: string;
  private statsTab: string = 'season';

  constructor(public navCtrl: NavController, private navParams: NavParams, private dataCenterService: DataCenterService) {
    this.category = navParams.get('category');
    this.createLeadersList();
  }

  createLeadersList() {
    var filterCategory = this.category.toLowerCase()
    var statsField = this.statsTab === 'season' ? 'stats' : 'playoffStats'
    this.playerList = new Array<object>();
    this.dataCenterService.getActivePlayers().subscribe((players) => {
      this.filteredPlayerList = players.sort((a: Player, b: Player) => {
        //TODO speed up this sorting
        if (!a[statsField][filterCategory])
          a[statsField][filterCategory] = 0
        if (!b[statsField][filterCategory])
          b[statsField][filterCategory] = 0
        if (a[statsField][filterCategory] > b[statsField][filterCategory]) return -1;
        if (a[statsField][filterCategory] < b[statsField][filterCategory]) return 1;
        return 0;
      });
      this.filteredPlayerList.map((player) => {
        var index = this.playerList.length + 1
        this.playerList.push(
          {
            label: index + '  -  ' + player.personal.FirstName + ' ' + player.personal.LastName,
            value: player[statsField][filterCategory]
          }
        )
      })
    })
  }

  openPlayer(playerIndex: number) {
    let player = this.filteredPlayerList[playerIndex];
    this.navCtrl.push(PlayerDetailView, {
      player: player,
      playerList: this.filteredPlayerList
    });
  }

}
