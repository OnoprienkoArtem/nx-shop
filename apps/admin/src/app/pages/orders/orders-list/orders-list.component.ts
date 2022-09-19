import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders = [];

  constructor() { }

  ngOnInit(): void {
  }

}
