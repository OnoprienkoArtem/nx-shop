import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrlProducts = `${environment.apiUrl}products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrlProducts);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrlProducts, productData);
  }

  // updateCategory(category: Category): Observable<Category> {
  //   return this.http.put<Category>(`${this.apiUrlCategories}/${category.id}`, category);
  // }

  // deleteCategory(categoryId: string): Observable<Category> {
  //   return this.http.delete<Category>(`${this.apiUrlCategories}/${categoryId}`);
  // }
}
