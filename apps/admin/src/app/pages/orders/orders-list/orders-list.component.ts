import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@bluebits/orders';


const ORDER_STATUS = {
  0: {
    label: 'Pending',
    color: 'primary'
  },
  1: {
    label: 'Processed',
    color: 'warning'
  },
  2: {
    label: 'Shipped',
    color: 'warning'
  },
  3: {
    label: 'Delivered',
    color: 'success'
  }
};

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