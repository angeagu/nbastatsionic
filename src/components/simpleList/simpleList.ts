import {Component, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'simple-list',
  inputs:['data','showValue'],
  outputs: ['onItemSelected'],
  templateUrl: 'simpleList.html'
})

export class SimpleList implements OnChanges {
  public simpleList: Array<string>;
  public showValue: boolean = false;
  onItemSelected: EventEmitter<number> = new EventEmitter<number>();

  constructor(public navCtrl: NavController) {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.simpleList = changes.data.currentValue;
    if (changes.showValue)
      this.showValue = changes.showValue.currentValue
  }

  itemClicked(index: number) {
    this.onItemSelected.emit(index);
  }

}
