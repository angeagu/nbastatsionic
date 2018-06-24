import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder, AbstractControl, ControlGroup, Validators } from '@angular/forms';
import {DataCenterService} from '../../data/dataCenterService';
import {Player} from '../../beans/player';
import {Team} from '../../beans/team';

@Component({
  templateUrl: 'compare.html',
  directives: [FORM_DIRECTIVES],
  providers: [DataCenterService]
})

export class CompareView {

  compareForm: ControlGroup;
  team1: AbstractControl;
  team2: AbstractControl;
  player1: AbstractControl;
  player2: AbstractControl;
  isReady: boolean = false;
  private teamList: Team[];
  private playerList: Player[];
  private playerList1: Player[];
  private playerList2: Player[];

  constructor(public navCtrl: NavController, private dataCenterService: DataCenterService, public formBuilder: FormBuilder) {
    this.compareForm = formBuilder.group({
      team1: ['',Validators.required],
      team2: ['',Validators.required],
      player1: ['',Validators.required],
      player2: ['',Validators.required]
    });
    //Exposing controls as instance variables.
    this.team1 = this.compareForm.controls.team1;
    this.team2 = this.compareForm.controls.team2;
    this.player1 = this.compareForm.controls.player1;
    this.player2 = this.compareForm.controls.player2;
    this.populateSelects();
    this.handleSelectUpdates();
  }

  populateSelects() {
    this.dataCenterService.getRosters().then(rosterData => {
      this.teamList = rosterData;
      var teamId = new String(this.teamList[0].id);

      this.dataCenterService.getActivePlayers().then(playerData => {
        this.playerList = playerData;
        this.playerList1 = playerData.filter((player) => {
          return player.team != null && player.team.id == teamId;
        });
        this.playerList2 = playerData.filter((player) => {
          return player.team != null && player.team.id == teamId;
        });
        //As inputs aren't defined with [(ngModel)] we have to use patchValue
        this.compareForm.patchValue({
          team1: this.teamList[0].id,
          team2: this.teamList[0].id,
          player1: this.playerList1[0].personal.ID,
          player2: this.playerList2[0].personal.ID
        });
        this.isReady = true;

      });
    });
  }

  handleSelectUpdates() {
    //Subscribing changes.
    this.team1.valueChanges.subscribe((value:string) => {
      this.playerList1 = this.playerList.filter((player: Player) => {
        return player.team != null && player.team.id == parseInt(value);
      });
      this.compareForm.patchValue({
        player1: this.playerList1[0].personal.ID
      })
    })
    this.team2.valueChanges.subscribe((value:string) => {
      this.playerList2 = this.playerList.filter((player: Player) => {
        return player.team != null && player.team.id == parseInt(value);
      });
      this.compareForm.patchValue({
        player2: this.playerList2[0].personal.ID
      })
    })
  }

  compare(form: object) {
    console.log ('Form sent:  ' + JSON.stringify(form));
  }

}

