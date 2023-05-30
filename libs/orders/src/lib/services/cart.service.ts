import { isNgTemplate } from '@angular/compiler';
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
    const cartItemExist = cart.items?.find(i => i.productId === cartItem.productId);
    if (cartItemExist) {
      cart.items?.map(item => {
        if (item.productId === cartItem.productId) {
          item.quantity = item.quantity + cartItem.quantity;
          return item;
        }
      })
    } else {
      cart.items?.push(cartItem);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
  }
}
