import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ListPage } from '../list/list';
import {PlayersView} from '../players/players';
import {TeamsView} from '../teams/teams';
import {LeadersView} from '../leaders/leaders';
import {CompareView} from '../compare/compare';
import {FavoritesView} from '../favorites/favorites';
import {GamesView} from '../games/games';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public navCtrl: NavController) {
    this.pages = [
      // { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage }
      { title: 'Players', component: PlayersView, icon: 'basketball' },
      { title: 'Teams', component: TeamsView, icon: 'people' },
      { title: 'Leaders', component: LeadersView, icon: 'star' },
      { title: 'Games', component: GamesView, icon: 'calendar' },
      { title: 'Standings', component: ListPage, icon: 'trophy' },
      { title: 'Rookies', component: ListPage, icon: 'body' },
      { title: 'Compare', component: CompareView, icon: 'trending-up' },
      { title: 'Favorites', component: FavoritesView, icon: 'heart' },
      { title: 'Sortable', component: ListPage, icon: 'list' },
      { title: 'Historical Players', component: ListPage, icon: 'information-circle' },
    ];
  }

  itemTapped(page) {
    this.navCtrl.push(page.component);

  }

}
