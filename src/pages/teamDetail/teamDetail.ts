import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {Team} from '../../beans/team';
import {FavoritesService} from "../../data/favorites/favoritesService";
import {DataCenterService} from "../../data/dataCenterService";

@Component({
  templateUrl: 'teamDetail.html',
  providers: [FavoritesService,DataCenterService]
})

export class TeamDetailView {
  team: Team;

  constructor(private navParams: NavParams, private favoritesService: FavoritesService,
              private dataCenterService:DataCenterService) {
    this.team = navParams.get('team');
    console.log(JSON.stringify(this.team))
    this.playerList = this.dataCenterService.getActivePlayers().subscribe(data => {
      return data.filter((player) => {
        if (player.team && player.team.ID == this.team.id) {
          console.log(JSON.stringify(player))
        }
        return player.team && player.team.ID == this.team.id
      })
    });
  }

  previous() {
    alert('previous team - TODO');
  }

  next() {
    alert('next team - TODO');
  }

}
