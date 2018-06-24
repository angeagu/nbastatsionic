import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataCenterService} from '../../data/dataCenterService';
import {Game} from '../../beans/game';
import * as moment from 'moment';
import {BoxscoreView} from "../boxscore/boxscore";


@Component({
  templateUrl: 'games.html',
  providers: [DataCenterService]
})

export class GamesView {

  private games: Game[];
  private gamesList: string[] = new Array<string>();
  private date: string = moment().format();

  constructor(public navCtrl: NavController, private dataCenterService: DataCenterService) {
    this.getGames();
  }

  getGames() {
    this.games = new Array<Game>();
    this.gamesList = new Array<string>();
    this.dataCenterService.getFullSchedule().subscribe((data) => {
      this.games = data.filter((game) => {
        //TODO remove subtract, by now we are faking year for getting games of last season
        return moment(game.date).format('l') === moment(this.date).subtract(1,'year').format('l')
      })
      this.games.forEach((game) => {
        this.gamesList.push(game.home.acronym + '  vs  ' + game.away.acronym);
      })
    })
  }

  openBoxscore(index:number) {
    console.log('');
    var id = this.games[index].id;
    this.navCtrl.push(BoxscoreView, {
      gameId: id,
      gameList: this.games
    });
  }

}

