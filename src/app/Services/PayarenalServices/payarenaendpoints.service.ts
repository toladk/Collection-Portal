import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { environment } from './../../../environments/environment';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export class Transactions {
  constructor(
    public fromDate: string,
    public toDate: string,
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class PayarenaendpointsService {

  constructor(
    private http: HttpClient
  ) { }


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

  getAllTransactions( tranStatus, fromDate: Date, toDate: Date ){
    const params = new HttpParams()
      .set("tranStatus", tranStatus)
      .set("fromDate", fromDate.toLocaleString('fr-CA', { day: '2-digit', month: '2-digit', year: 'numeric' }))
      .set("toDate", toDate.toLocaleString('fr-CA', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    return this.http.get(`${environment.payarenaBaseUrl}/statusTransactions?${params}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getPendingTransactions( tranStatus, fromDate: Date, toDate: Date ){
    const params = new HttpParams()
      .set("tranStatus", tranStatus)
      .set("fromDate", fromDate.toLocaleString('fr-CA', { day: '2-digit', month: '2-digit', year: 'numeric' }))
      .set("toDate", toDate.toLocaleString('fr-CA', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    return this.http.get(`${environment.payarenaBaseUrl}/statusTransactions?${params}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getApprovedTransactions( fromDate: Date, toDate: Date ){
    const params = new HttpParams()
      .set("fromDate", fromDate.toLocaleString('fr-CA', { day: '2-digit', month: '2-digit', year: 'numeric' }))
      .set("toDate", toDate.toLocaleString('fr-CA', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    return this.http.get(`${environment.payarenaBaseUrl}/approvedTransactions?${params}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getDeclinedTransactions( fromDate: Date, toDate: Date ){
    const params = new HttpParams()
      .set("fromDate", fromDate.toLocaleString('fr-CA', { day: '2-digit', month: '2-digit', year: 'numeric' }))
      .set("toDate", toDate.toLocaleString('fr-CA', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    return this.http.get(`${environment.payarenaBaseUrl}/declinedTransactions?${params}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  approveTransaction(payload){
    return this.http.post<any>(`${environment.payarenaBaseUrl}/approveTransaction`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  addTransaction(payload){
    return this.http.post<any>(`${environment.payarenaBaseUrl}/logTransaction`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

  getUserByUsername(username){
    return this.http.get(`${environment.profileUrl}getUserByUsername/${username}`, {headers:{
      Authorization: `${localStorage.token}`
    }})
  }

  getTransactionById(tranID){
    return this.http.get(`${environment.payarenaBaseUrl}/singleTransaction/${tranID}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }})
  }

}
