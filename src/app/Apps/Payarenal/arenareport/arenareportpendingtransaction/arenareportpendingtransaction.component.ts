import { Component, OnInit } from '@angular/core';
import { Faketable } from './../../model/faketable';
import { HttpClient } from '@angular/common/http';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayarenaendpointsService } from './../../../../Services/PayarenalServices/payarenaendpoints.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PayarenaModel } from './../../model/payarenamodel';

@Component({
  selector: 'app-arenareportpendingtransaction',
  templateUrl: './arenareportpendingtransaction.component.html',
  styleUrls: ['./arenareportpendingtransaction.component.css']
})
export class ArenareportpendingtransactionComponent implements OnInit {
  isShown: boolean = false ;
  isShown2: boolean = false ;
  isShown3: boolean = false ;

  allPendingTransactionList: PayarenaModel[] = [];
  allApprovedTransactionList: PayarenaModel[] = [];
  allDeclinedTransactionList: PayarenaModel[] = [];

  reportPendingTransForm: FormGroup;

  // for searching
  searchValue: string;

  // for buttons
  size: NzButtonSize = 'small';

  // for butting withl loader
  isLoadingTwo = false;

  // Pagination
  pagination: number = 1;

  // For Tabs
  indextab = 'First-content';
  index = 'First-content';
  rbatchId: any;
  currenttab = 0;
  batchNumber: any;
  current =  0;

  // for field
  bindPending = 'Pending';
  bindApproved = 'Approved';
  bindDeclined = 'Declined';

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private payArenaService: PayarenaendpointsService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.reportPendingTransForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      tranStatus: ['', Validators.required],
    });
  }

  // For tab changes
  tab(val): void {
    this.rbatchId = val;
    if (this.rbatchId === 'firstTab') {
        this.currenttab = 0;
        this.changetab();
        this.batchNumber = '';
      }

    if (this.rbatchId === 'secondTab') {
        this.currenttab = 1;
        this.changetab();
        this.batchNumber = '';
      }

    if (this.rbatchId === 'thirdTab') {
        this.currenttab = 2;
        this.changetab();
        this.batchNumber = '';
      }
  }
  changetab(): void {
    switch (this.currenttab) {
      case 0: {
        this.indextab = 'First-content';
        break;
      }
      case 1: {
        this.indextab = 'Second-content';
        break;
      }
      case 2: {
        this.indextab = 'Third-content';
        break;
      }

    }
  }

  // Sorting
  key: string = 'id';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  // Get Pending Transactions
  getPendingTransactions(){
    this.isShown = ! this.isShown;
    this.isShown2 = ! this.isShown2;
    this.isShown3 = ! this.isShown3;
    this.payArenaService.getAllTransactions( this.reportPendingTransForm.value.tranStatus, this.reportPendingTransForm.value.fromDate, this.reportPendingTransForm.value.toDate ).subscribe((result: any) => {
      this.allPendingTransactionList = result.value;
      if(result.isSuccess === true){
        this.isShown = this.isShown;
        this.notification.success( 'Transactions', 'Transactions Loaded Sucessfully!!' )
      }
      this.isShown = ! this.isShown;
    }, error => {
      this.notification.error('Transactions', error.error)
    });
  }

  // Get Approved Transactions
  getApprovedTransactions(){
    this.isShown = ! this.isShown;
    this.isShown2 = ! this.isShown2;
    this.isShown3 = ! this.isShown3;
    this.payArenaService.getAllTransactions( this.reportPendingTransForm.value.tranStatus, this.reportPendingTransForm.value.fromDate, this.reportPendingTransForm.value.toDate ).subscribe((result: any) => {
      this.allApprovedTransactionList = result.value;
      if(result.isSuccess === true){
        this.isShown = this.isShown;
        this.notification.success( 'Transactions', 'Transactions Loaded Sucessfully!!' )
      }
      this.isShown = ! this.isShown;
    }, error => {
      this.notification.error('Transactions', error.error)
    });
  }

  // Get Approved Transactions
  getDeclinedTransactions(){
    this.isShown = ! this.isShown;
    this.isShown2 = ! this.isShown2;
    this.isShown3 = ! this.isShown3;
    this.payArenaService.getAllTransactions( this.reportPendingTransForm.value.tranStatus, this.reportPendingTransForm.value.fromDate, this.reportPendingTransForm.value.toDate ).subscribe((result: any) => {
      this.allDeclinedTransactionList = result.value;
      if(result.isSuccess === true){
        this.isShown = this.isShown;
        this.notification.success( 'Transactions', 'Transactions Loaded Sucessfully!!' )
      }
      this.isShown = ! this.isShown;
    }, error => {
      this.notification.error('Transactions', error.error)
    });
  }

  // Excel Download
  downloadDataPending(){
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
    }, 5000);
    this.payArenaService.exportAsExcelFile(this.allPendingTransactionList, 'Transactions');
  }
  downloadDataApproved(){
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
    }, 5000);
    this.payArenaService.exportAsExcelFile(this.allApprovedTransactionList, 'Transactions');
  }
  downloadDataDeclined(){
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
    }, 5000);
    this.payArenaService.exportAsExcelFile(this.allDeclinedTransactionList, 'Transactions');
  }

}
