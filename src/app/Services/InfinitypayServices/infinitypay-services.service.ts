import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfinitypayServicesService {

    private baseUrl = environment.baseUrl;
    private calBaseUrl = environment.calBaseUrl;
    private profileUrl = environment.profileUrl;
    private infinityBaseUrl = environment.infinityBaseUrl;

    constructor(private http: HttpClient) { }

    getAll() {
      return this.http.get<any>(this.infinityBaseUrl + 'getall', {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
    }

    // getpendingtransaction

    getpendingtransaction(dateFrom, DateTo) {
      return this.http.get<any>(this.infinityBaseUrl + 'getpendingtransaction/' + dateFrom + '/'  + DateTo, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
    }
    // getconfirmtransaction

    getconfirmtransaction(dateFrom, DateTo) {
      return this.http.get<any>(this.infinityBaseUrl + 'getconfirmtransaction/' + dateFrom + '/'  + DateTo, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
    }

     // validate

    validate(payload){
    return this.http.post<any>(this.infinityBaseUrl + 'validate', payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

   // Add Transaction
   addTransaction(payload){
    return this.http.post<any>(this.infinityBaseUrl + 'add', payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }
}
