import { Injectable } from '@angular/core';
import {Favorite} from "../../beans/favorite";
import Rx from "rxjs/Rx";

@Injectable()
export class FavoritesService {
  favorites: Rx.Subject<Favorite> = new Rx.BehaviorSubject<Favorite>();

  constructor() {

  }

  addFavorite(favorite: Favorite) {
    this.favorites.next(favorite);
    console.log('added favorite: ' + JSON.stringify(favorite));
  }

  removeFavorite(favorite: Favorite) {

  }

  getFavorites(): Favorite[] {
    return this.favorites.filter((favorite: Favorite) => {
      //Devolvemos todos los favoritos de momento.
      return favorite != null
    })
  }
}
