import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, switchMap} from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '../models/order';
import { OrderItem } from '@bluebits/orders';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrlOrders = `${environment.apiUrl}orders`;
  apiUrlProducts = `${environment.apiUrl}products`;

  constructor(
    private http: HttpClient,
    private stripeService: StripeService,
  ) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrlOrders);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrlOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrlOrders, order);
  }

  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrlOrders}/${orderId}`, orderStatus);
  }

  deleteOrder(orderId: string): Observable<Order> {
    return this.http.delete<Order>(`${this.apiUrlOrders}/${orderId}`);
  }

  getOrdersCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlOrders}/get/count`).pipe(
      map((objectValue: any) => objectValue.orderCount),
    );
  }

  getTotalSales(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlOrders}/get/totalsales`).pipe(
      map((objectValue: any) => objectValue.totalsales),
    );
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlProducts}/${productId}`);
  }

  createCheckoutSession(orderItem: OrderItem[]) {
    return this.http.post<{id: string}>(`${this.apiUrlOrders}/create-checkout-session`, orderItem).pipe(
      switchMap((session: {id: string}) => {
        return this.stripeService.redirectToCheckout({sessionId: session.id});
      }),
    );
  }
}
