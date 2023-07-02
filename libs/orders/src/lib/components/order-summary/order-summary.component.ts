import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subject, switchMap, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  endSubs$: Subject<any> = new Subject();
  totalPrice!: number;

  constructor(
    private cartService: CartService,
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(true);
    this.endSubs$.complete();
  }

  private _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map(item => {
          this.orderService.getProduct(item?.productId).pipe(take(1)).subscribe(product => {
            this.totalPrice += product.price * item.quantity;
          });
        });
      }
    });
  }

}
