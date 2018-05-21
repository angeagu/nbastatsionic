import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {PlayersView} from '../pages/players/players';
import {TeamsView} from '../pages/teams/teams';
import {LeadersView} from '../pages/leaders/leaders';
import {CompareView} from '../pages/compare/compare';
import {FavoritesView} from '../pages/favorites/favorites';
import {GamesView} from '../pages/games/games';
import {BoxscoreView} from '../pages/boxscore/boxscore';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
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
      { title: 'Historical Players', component: ListPage, icon: 'information-circle' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
