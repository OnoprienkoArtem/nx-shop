import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@bluebits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';


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
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  private fetchOrders(): void {
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;

    });
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(order: Order): void {
    this.confirmationService.confirm({
      message: `Do you want to delete this '${order.id}' order?`,
      header: `Delete '${order.id}' order`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(order.id).subscribe({
          next: () => {
            this.messageService.add({severity: 'success', summary: 'Success', detail: `Order ${order.id} is deleted`});
            this.fetchOrders();
          },
          error: () => this.messageService.add({severity: 'success', summary: 'Success', detail: 'Order is not deleted'})
        });
      },
    });
  }
}
