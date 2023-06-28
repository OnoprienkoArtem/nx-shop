import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initCartLocalstorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const inialCart = {
        items: []
      };

      localStorage.setItem(CART_KEY, JSON.stringify(inialCart));
    }
  }

  getCart(): Cart {
    return JSON.parse(localStorage.getItem(CART_KEY) as string);
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items?.find(i => i.productId === cartItem.productId);
    if (cartItemExist) {
      cart.items?.forEach(item => {
        if (item.productId === cartItem.productId) {
          item.quantity = item.quantity + cartItem.quantity;
          return item;
        }
      })
    } else {
      cart.items?.push(cartItem);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string): void {
    const cart = this.getCart();
    const newCart = cart.items?.filter(item => item.productId !== productId);

    cart.items = newCart;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
  }
}
