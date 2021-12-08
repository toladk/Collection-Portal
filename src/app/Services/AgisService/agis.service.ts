
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class AgisService {

  constructor(
    private http: HttpClient
  ) { }

  addTransaction(payload){
    return this.http.post<any>(`${environment.agisBaseUrl}/addTransaction`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  updateTransaction(payload){
    return this.http.post<any>(`${environment.agisBaseUrl}/updateTransaction`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getPendingTransactions(){
    return this.http.get(`${environment.agisBaseUrl}/pendingTransactions`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  allTransactions(){
    return this.http.get(`${environment.agisBaseUrl}/transactions`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  approvedTransactions(){
    return this.http.get(`${environment.agisBaseUrl}/successfulTransactions`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  failedTransactions(){
    return this.http.get(`${environment.agisBaseUrl}/failedTransactions`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getRejectedTransactions(){
    return this.http.get(`${environment.agisBaseUrl}/rejectedTransactions`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getTransactionsById(id){
    return this.http.get(`${environment.agisBaseUrl}/transaction/${id}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  approveTransaction(payload){
    return this.http.post<any>(`${environment.agisBaseUrl}/approveTransaction`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  rejectTransaction(payload){
    return this.http.post<any>(`${environment.agisBaseUrl}/rejectTransaction`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getPaymentFor(){
    return this.http.get(`${environment.agisBaseUrl}/paymantFor`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getCadestralZone(){
    return this.http.get(`${environment.agisBaseUrl}/getZones`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getIdentity(){
    return this.http.get(`${environment.agisBaseUrl}/idType`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getUserByUsername(username){
    return this.http.get(`${environment.profileUrl}getUserByUsername/${username}`, {headers:{
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  // For Exporting Excel
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
