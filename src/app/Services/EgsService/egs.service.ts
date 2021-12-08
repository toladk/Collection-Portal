import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class EgsService {

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line:typedef
  getAllTransactions(tranStatus, fromDate, toDate, page, pageSize){
    return this.http.get(`${environment.egsUrl}/Transaction/ByStatus?tranStatus=${tranStatus}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // get invoice details
  // tslint:disable-next-line:typedef
  getInvoiceByInvoiceNo(invoiceNo){
    return this.http.get(`${environment.egsUrl}/Invoice/ByInvoiceNo?invoiceNo=${invoiceNo}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // get invoice details
  // tslint:disable-next-line:typedef
  postTransaction(payload){
    return this.http.post<any>(`${environment.egsUrl}/Transaction/LogNew`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // delete transaction
  // tslint:disable-next-line:typedef
  deleteTransaction(value){
    return this.http.delete(`${environment.egsUrl}/Transaction/ByInvoiceNo?invoiceNo=${value}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // approve transaction
  // tslint:disable-next-line:typedef
  approveTransaction(payload){
    return this.http.post<any>(`${environment.egsUrl}/Transaction/Approve`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // Reject transaction
  // tslint:disable-next-line:typedef
  rejectTransaction(payload){
    return this.http.post<any>(`${environment.egsUrl}/Transaction/Deny`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // GET transaction BY INVOICEnO
  // tslint:disable-next-line:typedef
  getTransactionByID(value){
    return this.http.get(`${environment.egsUrl}/Transaction/ByTranID?tranID=${value}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  // Get user by username
  // tslint:disable-next-line:typedef
  getUserByUsername(username){
    return this.http.get(`${environment.profileUrl}getUserByUsername/${username}`, {headers: {
      Authorization: `${localStorage.token}`
    }});
  }

  // For Exporting Excel
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    // tslint:disable-next-line:object-literal-key-quotes
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
