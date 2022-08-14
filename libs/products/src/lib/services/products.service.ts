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

  // getCategory(categoryId: string): Observable<Category> {
  //   return this.http.get<Category>(`${this.apiUrlCategories}/${categoryId}`);
  // }

  // createCategory(category: Category): Observable<Category> {
  //   return this.http.post<Category>(this.apiUrlCategories, category);
  // }

  // updateCategory(category: Category): Observable<Category> {
  //   return this.http.put<Category>(`${this.apiUrlCategories}/${category.id}`, category);
  // }

  // deleteCategory(categoryId: string): Observable<Category> {
  //   return this.http.delete<Category>(`${this.apiUrlCategories}/${categoryId}`);
  // }
}
