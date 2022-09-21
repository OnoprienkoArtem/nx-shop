import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@bluebits/orders';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];

  constructor(private ordersService: OrdersService,) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  private fetchOrders(): void {
    this.ordersService.getOrders().subscribe(orders => this.orders = orders);
  }

}
