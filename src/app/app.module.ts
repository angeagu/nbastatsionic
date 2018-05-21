import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {PlayersView} from '../pages/players/players';
import {PlayerDetailView} from '../pages/playerDetail/playerDetail';
import {TeamsView} from '../pages/teams/teams';
import {TeamDetailView} from '../pages/teamDetail/teamDetail';
import {LeadersView} from '../pages/leaders/leaders';
import {LeadersDetailView} from '../pages/leadersDetail/leadersDetail';
import {CompareView} from '../pages/compare/compare';
import {FavoritesView} from '../pages/favorites/favorites';
import {GamesView} from '../pages/games/games';
import {BoxscoreView} from '../pages/boxscore/boxscore';

import {GenericPlayerList} from '../components/genericPlayerList/genericPlayerList';
import {SimpleList} from '../components/simpleList/simpleList';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PlayersView,
    PlayerDetailView,
    TeamsView,
    TeamDetailView,
    LeadersView,
    LeadersDetailView,
    CompareView,
    FavoritesView,
    GamesView,
    BoxscoreView,
    SimpleList,
    GenericPlayerList
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PlayersView,
    PlayerDetailView,
    TeamsView,
    TeamDetailView,
    LeadersView,
    LeadersDetailView,
    CompareView,
    FavoritesView,
    GamesView,
    BoxscoreView,
    SimpleList,
    GenericPlayerList
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
