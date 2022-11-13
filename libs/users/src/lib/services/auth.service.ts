import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "@bluebits/users";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrlUsers = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrlUsers}/login`, {login, password});
  }
}
