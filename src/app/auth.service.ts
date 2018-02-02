import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators/tap';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('bearer');
    if (token) {
      const payload: any = jwtDecode(token);
      console.log(`${new Date(payload.exp * 1000)}/${ new Date(Date.now())}`);
      return payload.exp > Date.now() / 1000;
    }
    return false;
  }

  getToken(): string {
    return localStorage.getItem('bearer').replace('JWT', 'bearer');
  }

  register(user) {
    const u = {
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      password: user.password
    };
    return this.http.post('http://localhost:3000/auth/register', u);
  }

  login(credentials) {
    return this.http.post('http://localhost:3000/auth/login', credentials).pipe(
      tap((data: any) => {
        localStorage.setItem('bearer', data.token);
      })
    );
  }
}
