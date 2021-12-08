import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CalpayStudentService {

  private baseUrl = environment.baseUrl;
  private calBaseUrl = environment.calBaseUrl;
  private profileUrl = environment.profileUrl;
  constructor(private http: HttpClient) { }

  StudentDetail2() {
    return this.http.get<any>(this.calBaseUrl + 'StudentDetail', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  StudentDetail(pageIndex, pageSize, sortField, sortOrder) {
    return this.http.get<any>(this.calBaseUrl + `StudentDetail/search?%24top=${pageSize}&%24skip=${pageIndex}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  SearchStudent(pageIndex, pageSize, sortField, sortOrder, filter) {
    return this.http.get<any>(this.calBaseUrl + `StudentDetail/search?%24search=${filter}&%24top=${pageSize}&%24skip=${pageIndex}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // CREATE STUDENTS

  createStudent(payload){
    return this.http.post<any>(this.calBaseUrl + 'StudentDetail/create', payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // UPDATE STUDENT
  UpdateStudent(payload){
    return this.http.post<any>(this.calBaseUrl + 'StudentDetail/update', payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

    // Delete STUDENT
    DeleteStudent(payload){
      return this.http.post<any>(this.calBaseUrl + 'StudentDetail/delete', payload, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
    }
  // GET STUDENT DETAILS

  getStudentDetail​(id){
    return this.http.get<any>(this.calBaseUrl + 'odata/StudentDetail/' + (id), {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  //Get Program

  getSessions() {
    return this.http.get<any>(this.calBaseUrl + 'School/sessions', {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

   //Get sessions

   getProgram(id){
    return this.http.get<any>(this.calBaseUrl + `School/sessions/${id}/programs`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }


  getProgramByID(session, program){
    return this.http.get<any>(this.calBaseUrl + `School/sessions/${session}/programs/${program}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // CREATE PAYMENT

  createPayment(payload){
    return this.http.post<any>(this.calBaseUrl + 'PaymentRequest/create', payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  createBalance(payload){
    return this.http.post<any>(this.calBaseUrl + 'PaymentLineItem/create/balance', payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }


     // GET APPROVED PAYMENTS

     allPayments() {
      return this.http.get<any>(this.calBaseUrl + `PaymentLineItemMasterView`, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
    }


    // GET APPROVED PAYMENTS

    ApprovedPaymentsDetail(pageIndex, pageSize, sortField, sortOrder) {
      return this.http.get<any>(this.calBaseUrl + `PaymentLineItemMasterView/approved?%24top=${pageSize}&%24skip=${pageIndex}`, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
    }

     // GET APPROVED PAYMENTS

     RejectedPaymentsDetail(pageIndex, pageSize, sortField, sortOrder) {
      return this.http.get<any>(this.calBaseUrl + `PaymentLineItemMasterView/rejected?%24top=${pageSize}&%24skip=${pageIndex}`, {headers: {
        Authorization: `Bearer ${localStorage.token}`
      }});
    }

   // GET PATIAL PAYMENTS

   PartialPaymentsDetail(pageIndex, pageSize, sortField, sortOrder) {
    return this.http.get<any>(this.calBaseUrl + `PaymentLineItemMasterView/partial?%24top=${pageSize}&%24skip=${pageIndex}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // GET PENDING PAYMENTS

  PaymentsDetail(pageIndex, pageSize, sortField, sortOrder) {
    return this.http.get<any>(this.calBaseUrl + `PaymentLineItemMasterView/pending?%24top=${pageSize}&%24skip=${pageIndex}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  SearchPayments(pageIndex, pageSize, sortField, sortOrder, filter) {
    return this.http.get<any>(this.calBaseUrl + `PaymentLineItemMasterView/search?%24search=${filter}&%24top=${pageSize}&%24skip=${pageIndex}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // GET PAYMENT DETAILS;
  getPaymentDetail​(id){
    return this.http.get<any>(this.calBaseUrl + 'PaymentLineItemMasterView/id/' + (id), {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // UPDATE PAYMENT;
  UpdatePayment(payload){
    return this.http.post<any>(this.calBaseUrl + 'PaymentRequest/update', payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

// APPROVE PAYMENT;
ApprovePayment(payload){
  return this.http.post<any>(this.calBaseUrl + 'PaymentLineItem/approve', payload, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

// DELETE PAYMENT;
DeletePayment(payload){
  return this.http.post<any>(this.calBaseUrl + 'PaymentLineItem/delete', payload, {headers: {
    Authorization: `Bearer ${localStorage.token}`
  }});
}

}
