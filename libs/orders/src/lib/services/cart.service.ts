import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  initCartLocalstorage() {
    const inialCart = {
      items: []
    };

    localStorage.setItem(CART_KEY, JSON.stringify(inialCart));
  }

  getCart(): Cart {
    return JSON.parse(localStorage.getItem(CART_KEY) as string);
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();
    cart.items?.push(cartItem);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
  }
}
