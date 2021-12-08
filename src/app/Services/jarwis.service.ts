import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class JarwisService {

  // private baseUrl = 'http://localhost:8000/api/';

  private baseUrl = environment.baseUrl;
  private profileUrl = environment.profileUrl;
  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post(this.baseUrl + 'signup' , data)
  }

  // login(data) {
  //   return this.http.post(this.baseUrl + 'login' ,data)
  // }

  login(data) {
    return this.http.post(this.baseUrl + 'adloginv3' , data)
  }


  getMe() {
    return this.http.get(this.profileUrl + 'getUserByUsername/' + localStorage.getItem('user'), {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }
}
