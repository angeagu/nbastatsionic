import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Player} from '../../beans/player';
import {DataCenterService} from '../../data/dataCenterService';
import {LeadersDetailView} from "../leadersDetail/leadersDetail";

@Component({
  templateUrl: 'leaders.html',
  providers: [DataCenterService]
})

export class LeadersView {

  private categoriesList: string[];

  constructor(public navCtrl: NavController, private dataCenterService: DataCenterService) {
    this.createCategoriesList();
  }

  createCategoriesList() {
    this.categoriesList = [];
    var abbreviationMap = this.dataCenterService.getAbbreviationMap()
    Object.keys(abbreviationMap).forEach((abbreviation) => {
      this.categoriesList.push(abbreviationMap[abbreviation].charAt(0).toUpperCase() + abbreviationMap[abbreviation].slice(1));
    });
  }

  openCategory(index:number) {
    this.navCtrl.push(LeadersDetailView, {
      category: this.categoriesList[index]
    });
  }

}
