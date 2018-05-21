import { Component, OnChanges, SimpleChanges  } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PlayerDetailView} from '../../pages/playerDetail/playerDetail';
import {Player} from '../../beans/player';

@Component({
  selector: 'player-list',
  inputs:['playerList','grouped','searchable','showStats','showImage'],
  templateUrl: 'genericPlayerList.html'
})

export class GenericPlayerList implements OnChanges {
  public playerList: Array<Player>;
  public showStats: boolean;
  public showImage: boolean;
  public grouped: boolean;
  public searchable: boolean;
  private readonly initialPlayerList: Array<Player>;
  private sortedPlayerMap: object = {};
  private objectKeys = Object.keys;

  constructor(public navCtrl: NavController) {
    if (this.grouped) {
      this.createSortedPlayerMap();
    }
  }

  createSortedPlayerMap() {
    this.sortedPlayerMap = {};
    this.playerList.forEach((player:Player) => {
      var letter = player.personal.FirstName.charAt(0).toLowerCase();
      if (!this.sortedPlayerMap[letter]) {
        this.sortedPlayerMap[letter] = []
      }
      this.sortedPlayerMap[letter].push(player);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.playerList.currentValue) {
      //Initialize initialPlayer list
      if (!this.initialPlayerList) {
        this.initialPlayerList = this.playerList;
      }
      this.playerList = changes.playerList.currentValue;
      if (this.grouped) {
        this.createSortedPlayerMap();
      }
    }
  }

  openPlayerDetail(player) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(PlayerDetailView, {
      player: player,
      playerList: this.playerList
    });
  }

  searchPlayers(event: any) {
    let val = event.target.value;
    this.playerList = this.initialPlayerList;
    this.playerList = this.playerList.filter((item) => {
      return (item.personal.FirstName.toLowerCase().indexOf(val.toLowerCase()) > -1)
        || (item.personal.LastName.toLowerCase().indexOf(val.toLowerCase()) > -1)
    })
    if (this.grouped) {
      this.createSortedPlayerMap();
    }
  }



}
