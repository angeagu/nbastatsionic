import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Team} from '../beans/team';
import {Player} from '../beans/player';
import {Game} from '../beans/game';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs'
import {shareReplay} from "rxjs/operators";

@Injectable()
export class DataCenterService {

  private username: string = 'angeagu';
  private password: string = 'stojakovic';
  headers: Headers;

  private activePlayers: string = 'https://api.mysportsfeeds.com/v1.2/pull/nba/2016-2017-regular/active_players.json';
  private availableStats: string = 'https://api.mysportsfeeds.com/v1.2/pull/nba/current_season.json?fordate=20161117';
  private conferenceStandings = 'https://api.mysportsfeeds.com/v1.2/pull/nba/2016-2017-regular/conference_team_standings.json?teamstats=W,L'
  private cumulativeStats: string = 'https://api.mysportsfeeds.com/v1.2/pull/nba/2016-2017-regular/cumulative_player_stats.json';
  private cumulativeStatsPlayoff: string = 'https://api.mysportsfeeds.com/v1.2/pull/nba/2016-playoff/cumulative_player_stats.json';
  private overallTeamStandings: string = 'https://api.mysportsfeeds.com/v1.2/pull/nba/2016-2017-regular/overall_team_standings.json';
  private fullSchedule: string = 'https://api.mysportsfeeds.com/v1.2/pull/nba/2016-2017-regular/full_game_schedule.json';
  private fullSchedulePlayoff: string = 'https://api.mysportsfeeds.com/v1.2/pull/nba/2017-playoff/full_game_schedule.json'

  private activePlayersStream: Observable;

  constructor(private http: Http) {
    this.headers = new Headers()
    this.headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password))
    this.headers.append("Content-Type", "application/x-www-form-urlencoded")
    this.createActivePlayersStream()
  }

  getAbbreviationMap() {
    return {
      'GP' : 'games',
      'MIN/G' : 'minutes',
      'PTS/G' : 'points',
      'REB/G' : 'rebounds',
      'AST/G' : 'assists',
      'FG%/G' : 'fgPct',
      'F3%/G' : 'fg3Pct',
      'FT%/G' : 'ftPct',
      'STL/G' : 'steals',
      'BS/G' : 'blocks',
      'TOV/G' : 'turnovers',
      'OREB/G' : 'oreb',
      'DREB/G' : 'dreb',
      'FGM/G' : 'fgm',
      'FGA/G' : 'fga',
      'F3M/G' : 'fg3m',
      'F3A/G' : 'fg3a',
      'FTM/G' : 'ftm',
      'FTA/G' : 'fta',
      '+/-/G' : 'efficiency',
      'F/G'  : 'fouls'
      //Should be autogenerated
      // assistsPerTurnover: '',
      // stealsPerTurnover: '',
    }
  }

  createActivePlayersStream() {
    let abbreviationMap = this.getAbbreviationMap();
    this.activePlayersStream = Observable.forkJoin([
      this.http.get(this.activePlayers, {headers: this.headers}).map(res => res.json()),
      this.http.get(this.cumulativeStats, {headers: this.headers}).map(res => res.json()),
      this.http.get(this.cumulativeStatsPlayoff, {headers: this.headers}).map(res => res.json())
    ])
    .map((data) => {
      var activePlayersData = data[0];
      var statsData = data[1];
      var playoffStatsData = data[2];
      var playerList = new Array();
      //TODO, esto en una funcion aparte, propia de un parser para MySportsFeed
      //PERSONAL && TEAM INFO
      activePlayersData.activeplayers.playerentry.forEach((playerentry) => {
        var player = new Player();
        player.personal = playerentry.player;
        player.team = playerentry.team;
        player.stats = {};
        player.playoffStats = {};
        playerList.push(player)
      })

      var stats = statsData.cumulativeplayerstats.playerstatsentry;
      var playoffStats = playoffStatsData.cumulativeplayerstats.playerstatsentry;
      playerList.forEach((player) => {
        //STATS REGULAR SEASON
        var playerEntry = stats.filter(function(entry) {
          return entry.player.ID == player.personal.ID
        })[0];
        if (playerEntry) {
          var playerStats = playerEntry.stats;
          var playerStatsKeys = Object.keys(playerStats);
          playerStatsKeys.forEach(function(key) {
            var abbreviation = playerStats[key]["@abbreviation"];
            var categoryStat = abbreviationMap[abbreviation];
            player.stats[categoryStat] = new Number(playerStats[key]["#text"]);
          })
        }
        //STATS PLAYOFF
        var playerEntry = playoffStats.filter(function(entry) {
          return entry.player.ID == player.personal.ID
        })[0];
        if (playerEntry) {
          var playerStats = playerEntry.stats;
          var playerStatsKeys = Object.keys(playerStats);
          playerStatsKeys.forEach(function(key) {
            var abbreviation = playerStats[key]["@abbreviation"];
            var categoryStat = abbreviationMap[abbreviation];
            player.playoffStats[categoryStat] = new Number(playerStats[key]["#text"]);
          })
        }
      });

      //TODO quitar los entrenadores, no tienen stats , player.stats es {}

      return playerList;
    })
    .map((playerList) => {
      playerList = playerList.sort((a, b) => {
        if (a.personal.FirstName < b.personal.FirstName) return -1;
        if (a.personal.FirstName > b.personal.FirstName) return 1;
        return 0;
      });
      return playerList;
    })
    .shareReplay(1);
  }

  getActivePlayers() {
    return this.activePlayersStream;

  }

  getPlayerStatsSeason(playerID) {
    return this.http.get(this.playerStats + playerID, {headers: this.headers})
      .map((res:Response) => res.json())
      .map(data => {

      });
  }

  getRosters(): Team[] {
    return this.http.get(this.overallTeamStandings, {headers: this.headers}).map((res:Response) => res.json())
  }

  getPlayerStatsCategories() {
    //TODO en duda... quiza no quiera tantas estadisticas, sino solo las incluidas en el objeto Player
    return this.http.get(this.availableStats, {headers: this.headers})
      .map((res:Response) => res.json())
      .map(data => {
        var categories: object[] = new Array();
        data.currentseason.season[0].supportedPlayerStats.playerStat.forEach((playerStat) => {
          var category = {}
          category.name = playerStat.name;
          category.abbreviation = playerStat.abbreviation;
          categories.push(category);
        });
        return categories
      });

  }

  getOverallStandings() {

  }

  getConferenceStandings() {
    return this.http.get(this.conferenceStandings, {headers: this.headers}).map((res:Response) => res.json());

  }

  getDivisionStandings() {

  }

  getFullSchedule() {
    return Observable.forkJoin([
      this.http.get(this.fullSchedule, {headers: this.headers}).map((res:Response) => res.json()),
      this.http.get(this.fullSchedulePlayoff, {headers: this.headers}).map((res:Response) => res.json())
    ])
    .map((data) => {
      var games = new Array<Team>();
      data.forEach((gameData) => {
        let gameentry = gameData.fullgameschedule.gameentry;
        gameentry.forEach((game) => {
          let home: Team = new Team(game.homeTeam.ID, game.homeTeam.City + ' ' + game.homeTeam.Name, game.homeTeam.Abbreviation)
          let away: Team = new Team(game.awayTeam.ID, game.awayTeam.City + ' ' + game.awayTeam.Name, game.awayTeam.Abbreviation)
          let gameID: number = new Number(game.id)
          let date: string = game.date
          games.push(new Game(gameID,home,away,date));
        })
      })

      return games;
    })
  }

}
