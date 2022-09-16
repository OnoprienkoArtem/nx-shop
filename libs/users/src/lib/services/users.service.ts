import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../models/user';
import * as countriesLib from 'i18n-iso-countries';
declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrlUsers = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) { 
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'))
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlUsers);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrlUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlUsers, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrlUsers}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrlUsers}/${userId}`);
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', {select: 'official'})).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      }
    });    
  }
}
