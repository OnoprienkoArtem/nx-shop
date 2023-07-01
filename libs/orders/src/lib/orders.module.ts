import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { CartService } from './services/cart.service';

import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';


export const ordersRoutes: Route[] = [
  {
    path: 'cart',
    component: CartPageComponent,
  }
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      BadgeModule,
      ToastModule,
      ButtonModule,
      InputNumberModule,
      RouterModule.forChild(ordersRoutes),
    ],
    declarations: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
    ],
    exports: [
      CartIconComponent,
      CartPageComponent,
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
