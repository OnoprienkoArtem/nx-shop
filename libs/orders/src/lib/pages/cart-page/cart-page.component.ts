import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit {

  cartItemsDetailed: CartItemDetailed[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }


  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(): void {
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe(respCart => {
      respCart.items.forEach(cartItem => {
        this.ordersService.getProduct(cartItem.productId).subscribe(respProduct => {
          this.cartItemsDetailed.push({
            product: respProduct,
            quantity: cartItem.quantity
          });
        });
      })
    });
  }

}
