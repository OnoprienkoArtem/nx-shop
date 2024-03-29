import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../models/user';
import * as countriesLib from 'i18n-iso-countries';
import { UsersFacade } from '../state/users.facade';
declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrlUsers = `${environment.apiUrl}users`;

  constructor(
    private http: HttpClient,
    private usersFacade: UsersFacade
  ) {
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

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

  getUsersCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlUsers}/get/count`).pipe(
      map((objectValue: any) => objectValue.userCount),
    );
  }

  initAppSession(): void {
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser(): Observable<any> {
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth(): Observable<any> {
    return this.usersFacade.isAthenticated$;
  }
}
