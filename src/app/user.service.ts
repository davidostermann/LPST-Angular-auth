import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

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
    console.log('credentials : ', credentials);

    return this.http.post('http://localhost:3000/auth/login', credentials);
  }

}
