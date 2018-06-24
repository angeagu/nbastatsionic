import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataCenterService} from '../../data/dataCenterService';
import {TeamDetailView} from '../../pages/teamDetail/teamDetail';
import {Team} from '../../beans/team';

@Component({
  templateUrl: 'teams.html',
  providers: [DataCenterService]
})

export class TeamsView {

  private teamList: string[];
  private teams: Team[];

  constructor(public navCtrl: NavController, private dataCenterService: DataCenterService) {
    this.createTeamList();
  }

  createTeamList() {
    this.dataCenterService.getRosters().subscribe(data => {
      //TODO todo esto tiene que ser una transformacion, otro stream.
      //OJO, que es chula esta, porque tiene un stream que 'llama' a otro.
      this.teamList = new Array<string>();
      this.teams = new Array<Team>();
      data.overallteamstandings.teamstandingsentry.forEach((teamentry) => {
        var team: Team = new Team(teamentry.team.id,teamentry.team.City + ' ' + teamentry.team.Name,teamentry.team.Abbreviation);
        this.teams.push(team)
      })
      this.teams.sort((a: Team, b: Team) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.teams.forEach((team) => {
        this.teamList.push(team.name)
      })

    });

  }

  openTeamDetail(index:number) {
    var team: Team = this.teams[index];
    this.navCtrl.push(TeamDetailView, {
      team: team
    });
  }

}
