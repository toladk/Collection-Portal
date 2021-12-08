import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClient } from '@angular/common/http';
import { EgsService } from 'src/app/Services/EgsService/egs.service';
import { EgsReportModel } from '../model/egsmodelreport';

@Component({
  selector: 'app-egsreport',
  templateUrl: './egsreport.component.html',
  styleUrls: ['./egsreport.component.css']
})
export class EgsreportComponent implements OnInit {

  transactionForm: FormGroup;
  downloadForm: FormGroup;

  allTransactionList: EgsReportModel[] = [];

  show = false;
  show2 = false;
  show3 = true;
  isLoadingOne = false;
  isLoadingOneDownload = false;
  downloadSearch1 = true;
  downloadSearch2 = false;

  // pagination
  default = 1;
  pagination: number;
  itemsPerPage = 10;

  // for searching
  searchValue: string;

  // Sorting
  key = '';
  reverse = false;
  downloadInputValue: any;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private egsService: EgsService,
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      tranStatus: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });

    this.downloadForm = this.formBuilder.group({
      downloadSelect: ['', Validators.required],
    });

  }

  sort(key): void{
    this.key = key;
    this.reverse = !this.reverse;
  }

  getAllTransactions(): void{
    this.show = true;
    this.isLoadingOne = true;
    this.show3 = false;
    // tslint:disable-next-line:max-line-length
    this.egsService.getAllTransactions(this.transactionForm.value.tranStatus, this.transactionForm.value.fromDate, this.transactionForm.value.toDate, this.default, this.itemsPerPage).subscribe((result: any) => {
      this.allTransactionList = result.respData;
      this.show = false;
      this.isLoadingOne = false;
      this.downloadSearch1 = false;
      this.downloadSearch2 = true;
      this.notification.success('Transaction', 'Transaction Fetch Successfully !!');
      if (this.allTransactionList.length === 0){
        this.show = false;
        this.show2 = true;
        this.show3 = false;
      }
    }, error => {
      this.show = false;
      this.show3 = false;
      this.isLoadingOne = false;
      this.downloadSearch1 = true;
      this.downloadSearch2 = false;
      this.notification.error('Transaction', error.error.respMessage || error.error.message);
    });
  }
  getAllTransactionsPage(pageNumber): void{
    this.show = true;
    this.isLoadingOne = true;
    this.show3 = false;
    // tslint:disable-next-line:max-line-length
    this.egsService.getAllTransactions(this.transactionForm.value.tranStatus, this.transactionForm.value.fromDate, this.transactionForm.value.toDate, pageNumber, this.itemsPerPage).subscribe((result: any) => {
      this.allTransactionList = result.respData;
      this.show = false;
      this.isLoadingOne = false;
      this.downloadSearch1 = false;
      this.downloadSearch2 = true;
      this.notification.success('Transaction', 'Transaction Fetch Successfully !!');
      if (this.allTransactionList.length === 0){
        this.show = false;
        this.show2 = true;
        this.show3 = false;
      }
    }, error => {
      this.show = false;
      this.isLoadingOne = false;
      this.show3 = false;
      this.downloadSearch1 = true;
      this.downloadSearch2 = false;
      this.notification.error('Transaction', error.error.respMessage || error.error.message);
    });
  }

  // Excel Download Report
  changeDownloadSelect(): void{
    this.downloadInputValue = this.downloadForm.value.downloadSelect;
  }
  downloadReportData(): void{
    if (this.downloadInputValue === 'pdf') {
      this.notification.warning('PDF', 'Still Under Developmet !!');
    } else {
      this.isLoadingOneDownload = true;
      setTimeout(() => {
        this.isLoadingOneDownload = false;
      }, 5000);
      this.egsService.exportAsExcelFile(this.allTransactionList, 'Transactions Report');
      }
  }


}
