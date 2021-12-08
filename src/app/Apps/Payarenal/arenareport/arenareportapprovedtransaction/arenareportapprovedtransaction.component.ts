import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayarenaendpointsService } from './../../../../Services/PayarenalServices/payarenaendpoints.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PayarenaModel } from './../../model/payarenamodel';

@Component({
  selector: 'app-arenareportapprovedtransaction',
  templateUrl: './arenareportapprovedtransaction.component.html',
  styleUrls: ['./arenareportapprovedtransaction.component.css']
})
export class ArenareportapprovedtransactionComponent implements OnInit {
  isShown: boolean = false ;
  isShown2: boolean = false ;

  approvedTransactionList: PayarenaModel[] = [];

  reportApprovedTransForm: FormGroup;

  // for searching
  searchValue: string;

  // for buttons
  size: NzButtonSize = 'small';

  // for butting withl loader
  isLoadingTwo = false;

  // Pagination
  pagination: number = 1;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private payArenaService: PayarenaendpointsService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.reportApprovedTransForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }

  // Sorting
  key: string = 'id';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  getApprovedTransactions(){
    this.isShown = ! this.isShown;
    this.isShown2 = ! this.isShown2;
    this.payArenaService.getApprovedTransactions( this.reportApprovedTransForm.value.fromDate, this.reportApprovedTransForm.value.toDate ).subscribe((result: any) => {
      this.approvedTransactionList = result.value;
      console.log('Checking Approved List', this.approvedTransactionList);
      if(result.isSuccess === true){
        this.isShown = this.isShown;
        this.notification.success( 'Approved Transaction', 'Approved Transaction Loaded Sucessfully!!' )
      }
    },error => {
      this.notification.error('Approved Transaction', error.error)
    })
  }

  // Excel Download
  downloadData(){
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
    }, 5000);
    this.payArenaService.exportAsExcelFile(this.approvedTransactionList, 'Approved Transactions');
  }

}
