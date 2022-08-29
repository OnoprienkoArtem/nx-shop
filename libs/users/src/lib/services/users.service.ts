import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrlUsers = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlUsers);
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
