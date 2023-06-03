import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';

export const ordersRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
      CartIconComponent
    ],
    exports: [
      CartIconComponent
    ]
})
export class OrdersModule {
  constructor(cartServicr: CartService) {
    cartServicr.initCartLocalstorage();
  }
}
