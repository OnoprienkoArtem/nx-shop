import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  initCartLocalstorage() {
    const inialCart = {
      items: []
    };

    localStorage.setItem('cart', JSON.stringify(inialCart));
  }
}
