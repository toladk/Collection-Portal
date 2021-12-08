import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemitaService {

  private baseUrl = environment.baseUrl;
  private remitaUrl = environment.remitaUrl;
  private profileUrl = environment.profileUrl;
  constructor(private http: HttpClient) { }

  billerCategories() {
    return this.http.get<any>(this.remitaUrl + 'biller-Categories', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  allTransactions() {
    return this.http.get<any>(this.remitaUrl + 'view-all-transactions', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  reInitiateBillPayment(id){
    return this.http.get<any>(this.remitaUrl + `re-initiate-billPayment/${id}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getTransactionByQuery(pageIndex, pageSize, sortField, sortOrder, filterStatus){
    return this.http.get<any>(this.remitaUrl + `get-transaction-by-query?RRR=${sortField}&Status=${filterStatus}&PageNumber=${pageIndex}&PageSize=${pageSize}&OrderBy=${sortOrder}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getRRRDetails(rrr){
    return this.http.get<any>(this.remitaUrl + `getRRR-Details/${rrr}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  transactionQuery(billPaymenttransactionRef){
    return this.http.post<any>(this.remitaUrl + `transaction-query/${billPaymenttransactionRef}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getTransactionById(id){
    return this.http.get<any>(this.remitaUrl + `get-transaction-by-id/${id}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  billPaymentNotification(data){
    return this.http.post<any>(this.remitaUrl + `billPayment-notification-with-receipt`, data, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  billersByCategory(id){
    return this.http.get<any>(this.remitaUrl + `billers-by-Category/category/${id}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  billersProducts(id){
    return this.http.get<any>(this.remitaUrl + `get-biller-Products/biller/${id}/products`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  customerValidation(data){
    return this.http.post<any>(this.remitaUrl + `customer-validation`, data, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  initiateBillPayment(data){
    return this.http.post<any>(this.remitaUrl + `initiate-billPayment`, data, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }
}
