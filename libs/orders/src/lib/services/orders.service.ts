import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { environment } from '@env/environment';
import { Order } from '../models/order';
import { OrderItem } from '@bluebits/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrlOrders = `${environment.apiUrl}orders`;
  apiUrlProducts = `${environment.apiUrl}products`;

  constructor(private http: HttpClient) { }

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
    return this.http.post(`${this.apiUrlOrders}/create-checkout-session`, orderItem);
  }
}
