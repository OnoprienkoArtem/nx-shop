import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "@bluebits/users";
import { Observable } from "rxjs";
import {LocalstorageService} from "./localstorage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrlUsers = `${environment.apiUrl}users`;

  constructor(
    private http: HttpClient,
    private localStorageToken: LocalstorageService,
    private router: Router,
  ) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrlUsers}/login`, {email, password});
  }

  logout() {
    this.localStorageToken.removeToken();
    this.router.navigate(['/login']);
  }
;}
