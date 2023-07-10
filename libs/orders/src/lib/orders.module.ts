import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { CartService } from './services/cart.service';

import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';


export const ordersRoutes: Route[] = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
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
      InputTextModule,
      InputMaskModule,
      DropdownModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule.forChild(ordersRoutes),
    ],
    declarations: [
      CartIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
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
