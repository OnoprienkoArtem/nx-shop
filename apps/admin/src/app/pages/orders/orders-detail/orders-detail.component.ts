import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@bluebits/orders';
import { MessageService } from 'primeng/api';
import { catchError, filter, of, switchMap, take, tap, timer } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;
  timerBack$ = timer(2000).pipe(tap(() => this.location.back()));

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location,
  ) { }

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
        this.order = order;
        this.selectedStatus = order.status;
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

  onStatusChange(event) {
    this.ordersService.updateOrder({status: event.value}, this.order.id).pipe(
      filter(Boolean),
      tap(() => this.messageService.add({severity: 'success', summary: 'Success', detail: 'Order Status is updated!'})),
      switchMap(() => this.timerBack$),
      catchError(() => of(this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Status is not updated' }))),
      take(1),
    ).subscribe();
  }
}
