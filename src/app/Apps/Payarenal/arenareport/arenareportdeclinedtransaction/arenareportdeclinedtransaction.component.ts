import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayarenaendpointsService } from './../../../../Services/PayarenalServices/payarenaendpoints.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PayarenaModel } from './../../model/payarenamodel';
@Component({
  selector: 'app-arenareportdeclinedtransaction',
  templateUrl: './arenareportdeclinedtransaction.component.html',
  styleUrls: ['./arenareportdeclinedtransaction.component.css']
})
export class ArenareportdeclinedtransactionComponent implements OnInit {
  isShown: boolean = false ;
  isShown2: boolean = false ;

 declinedTransactionList: PayarenaModel[] = [];

  reportDeclinedTransForm: FormGroup;

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
    this.reportDeclinedTransForm = this.formBuilder.group({
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

  getDeclinedTransactions(){
    this.isShown = ! this.isShown;
    this.isShown2 = ! this.isShown2;
    this.payArenaService.getDeclinedTransactions( this.reportDeclinedTransForm.value.fromDate, this.reportDeclinedTransForm.value.toDate ).subscribe((result: any) => {
      this.declinedTransactionList = result.value;
      console.log('Checking Declined List', this.declinedTransactionList);
      if(result.isSuccess === true){
        this.isShown = this.isShown;
        this.notification.success( 'Declined Transaction', 'Declined Transaction Loaded Sucessfully!!' )
      }
    },error => {
      this.notification.error('Declined Transaction', error.error)
    })
  }

  // Excel Download
  downloadData(){
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
    }, 5000);
    this.payArenaService.exportAsExcelFile(this.declinedTransactionList, 'Pending Transactions');
  }

}
