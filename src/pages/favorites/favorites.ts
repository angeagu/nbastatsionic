import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FavoritesService} from '../../data/favorites/favoritesService';
import {Favorite} from '../../beans/favorite';

@Component({
  templateUrl: 'favorites.html',
  providers: [FavoritesService]
})

export class FavoritesView {

  private favoritesList: string[];
  private favorites: Favorite[];

  constructor(public navCtrl: NavController, private favoritesService: FavoritesService) {
    this.createFavoritesList();
  }

  createFavoritesList() {
    this.favoritesList = [];
    this.favorites = this.favoritesService.getFavorites();
    console.log ('favorites: ' + JSON.stringify(this.favorites));
    this.favorites.forEach((favorite: Favorite) => {
      this.favoritesList.push(favorite.name);
    });

  }

  openFavorite(index:number) {
    console.log('Abriendo favorito: ' + JSON.stringify(this.favoritesList[index]))
  }

}
