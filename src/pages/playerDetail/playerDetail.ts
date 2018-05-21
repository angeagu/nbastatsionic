import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {Favorite} from '../../beans/favorite';
import {FavoritesService} from "../../data/favorites/favoritesService";
import {DataCenterService} from "../../data/dataCenterService";

@Component({
  templateUrl: 'playerDetail.html',
  providers: [FavoritesService,DataCenterService]
})

export class PlayerDetailView {
  index: number;
  player: Player;
  playerList: Array<Player>;
  statsStab: string;
  private objectKeys = Object.keys;

  constructor(private navParams: NavParams, private favoritesService: FavoritesService,
              private dataCenterService:DataCenterService) {
    this.statsTab = "season"
    this.player = navParams.get('player')
    console.log (JSON.stringify(this.player.personal))
    this.playerList = navParams.get('playerList')
    this.index = this.playerList.map(function(player) {
      return player.personal.ID;
    }).indexOf(this.player.personal.ID);
  }

  favorite() {
    var name = this.player.personal.FirstName + ' ' + this.player.personal.LastName;
    var favorite: Favorite = new Favorite(this.player.personal.ID,name,Favorite.PLAYER);
    this.favoritesService.addFavorite(favorite);
  }

  previous() {
    if (this.index>0) {
      this.index = this.index-1;
    }
    else {
      this.index = this.playerList.length-1
    }
    this.player = this.playerList[this.index]
  }

  next() {
    if (this.index<this.playerList.length-1) {
      this.index = this.index+1;
    }
    else {
      this.index = 0
    }
    this.player = this.playerList[this.index]

  }

}
