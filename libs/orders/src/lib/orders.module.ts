import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

export const ordersRoutes: Route[] = [];

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      BadgeModule,
      ToastModule,
    ],
    declarations: [
      CartIconComponent,
    ],
    exports: [
      CartIconComponent,
    ],
    providers: [
      MessageService,
    ]
})
export class OrdersModule {
  constructor(cartServicr: CartService) {
    cartServicr.initCartLocalstorage();
  }
}
