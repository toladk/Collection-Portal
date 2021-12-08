import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // private iss = {
  //   login : 'http://localhost:8000/api/login',
  //   signup : 'http://localhost:8000/api/signup'
  // }

  private iss = {
    //test server
    login : 'http://10.0.33.12:8017/adloginv3',

    // live server
    // login: 'http://10.0.16.145:8017/adloginv3',
    signup : environment.signup
  }

  constructor() { }

  handle(token: any) {
    this.set(token);
  }
  handle2(app: any) {
    this.set2(app);
  }

  set(token: string) {
    localStorage.setItem('token', token);
  }

  set2(app: string) {
    localStorage.setItem('app', app);
  }

  user(user: string) {
    localStorage.setItem('user', user);
  }

  get() {
    return localStorage.getItem('token');
  }

  get2() {
    return localStorage.getItem('app');
  }

  getUser() {
    return localStorage.getItem('user');
  }

  remove() {
    return localStorage.removeItem('token');
  }

  remove2() {
    return localStorage.removeItem('app');
  }

  removeUser() {
    return localStorage.removeItem('user');
  }

  isValid() {
    const token = this.get();
    const me = this.getUser();
    if(token) {
      const payload = this.payload(token);
      if(payload.username) {
      return (payload.username === me) ? true : false; //easy hint;
      // return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false ;
      }
    }
    return false;
  }

  payload(token: string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: string) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}

