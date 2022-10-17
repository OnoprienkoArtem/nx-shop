import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { filter, switchMap, take, tap } from 'rxjs';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];

  constructor(private ordersService: OrdersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mapOrderStatus();
    this.fetchOrder();    
  }

  private fetchOrder(): void {
    this.route.params.pipe(
      filter(params => params['id']),
      switchMap(params => {       
        return this.ordersService.getOrder(params['id'])
      }),
      tap(order => {        
        console.log(order);
        
        this.order = order;
      }),
      take(1),
    ).subscribe();
  }

  private mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    })
  }

}
