import { Component,ElementRef,Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import {GridOptions} from "ag-grid/main";
import { NavParams } from 'ionic-angular';
import {Team} from '../../beans/team';
import {Player} from '../../beans/player';
import {FavoritesService} from "../../data/favorites/favoritesService";
import {DataCenterService} from "../../data/dataCenterService";

@Component({
  templateUrl: 'teamDetail.html',
  providers: [FavoritesService,DataCenterService]
})

export class TeamDetailView implements AfterViewInit {
  @ViewChild('teamGrid') teamGrid: ElementRef;
  team: Team;
  playerList: Array<Player>;
  columnDefs: Array<object>;
  rowData: Array<object>;
  private gridOptions:GridOptions;

  constructor(private navParams: NavParams, private favoritesService: FavoritesService,
              private dataCenterService:DataCenterService, private renderer: Renderer2) {
    this.team = navParams.get('team');
    this.playerList = this.dataCenterService.getActivePlayers().subscribe(data => {
      return data.filter((player) => {
        return player.team && player.team.ID == this.team.id
      })
    });
  }

  ngAfterViewInit() {
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      }
    };
    this.columnDefs = [
      {headerName: 'Make', field: 'make' },
      {headerName: 'Model', field: 'model' },
      {headerName: 'Price', field: 'price'}
    ];
    this.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
  }

  previous() {
    alert('previous team - TODO');
  }

  next() {
    alert('next team - TODO');
  }

}
