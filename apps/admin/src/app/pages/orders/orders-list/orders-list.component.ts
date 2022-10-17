import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { ORDER_STATUS } from '../order.constants';


@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  orderStatus = ORDER_STATUS;

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  private fetchOrders(): void {
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log('orders', this.orders);
      
    });
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

}
