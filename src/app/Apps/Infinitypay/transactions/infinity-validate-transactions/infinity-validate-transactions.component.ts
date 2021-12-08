import { Component, Injectable, OnInit } from '@angular/core';
import { InfinitypayServicesService } from 'src/app/Services/InfinitypayServices/infinitypay-services.service';
import { CalpayStudentService } from 'src/app/Services/CalpayServices/calpay-student.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';


interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

declare let $: any;
declare let swal: any;
declare let toastr: any;

@Component({
  selector: 'app-infinity-validate-transactions',
  templateUrl: './infinity-validate-transactions.component.html',
  styleUrls: ['./infinity-validate-transactions.component.css']
})
export class InfinityValidateTransactionsComponent implements OnInit {


  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 0;
  sortField = 'MatricNumber';
  sortOrder = 'asc';

  expandSet = new Set<number>();

  public search = {
    student: '',
  };

  listOfData: any;
  visible = false;
  account = 'new';
  disabled = false;

  public validate = {
    transref: '',
  };

  public dateSearch = {
    DateFrom: '',
    DateTo: '',
  };

  public form = {
    debitAccountNumber: '',
    debitAccountName: '',
    creditAccountNumber: '',
    creditAccountName: '',
    customerAccountNumber: '',
    bankName: '',
    branchName: '',
    expectedAmount: '',
    expectedDate: '',
    uniqueDepositReference: '',
    actualAmount: '',
    actualDate: '',
    customerNarration: '',
    cbnCode: '',
    bankUniqueReference: '',
    debitDate: '',
    createdBy: '',
    teller: ''
  };
  index = 'First-content';
  indextab = 'First-content';
  current =  0;
  current2 =  0;
  errorFlag: any;
  errorMessage: any;
  Type: any;
  Title: any;
  Status: any;
  Detail: any;
  Instance: any;
  type: string;
  newresponse: string;
  actionBotton: string;
  visible2: boolean;
  tableCount: any;
  totalCount: any;
  payloads: any;
  payloadsCount: any;
  valueIsSuccess: any;
  returnMessage: any;
  isSuccess: any;
  error: any;
  timestamp: any;
  isFailure: any;
  validisFailure: any;
  validisSuccess: any;
  validtimestamp: any;
  valuesuccess: any;
  validmessage: any;
  validData: any;
  currenttab: number;
  rbatchId: string;
  Pendingtransactions: any;
  totalPendingtransactions: any;
  confirmtransactions: any;
  totalConfirmtransaction: any;
  constructor(
              private infinity: InfinitypayServicesService,
              private calStudents: CalpayStudentService,
              private ngxService: NgxUiLoaderService,
              private nzMessageService: NzMessageService,
              private notification: NzNotificationService,
              private modal: NzModalService,
              private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ngxService.startLoader('loader-02');
    // this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
    // this.loadDataFromServer(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, []);
    // for (let i = 0; i < 100; i++) {
    //   this.listOfData.push({
    //     name: `Edward King ${i}`,
    //     age: 32,
    //     address: `London`
    //   });
    // }

    this.actRoute.paramMap.subscribe((params => {
      const val = params.get('id');
      this.rbatchId = val;
      this.tab(this.rbatchId);
    }));

    this.infinity.getAll().subscribe(
      data => {
                this.loading = false;
                const infinity: any = data;
                this.listOfData  = infinity.value;
                this.total = this.listOfData.length;
                this.ngxService.stopLoader('loader-02');
      },
      error => {
        this.ngxService.stopLoader('loader-02');
      }
    );

    this.infinity.getpendingtransaction('2020-01-03', '2021-3-03').subscribe(
      data => {
                const getpendingtransaction: any = data;
                this.Pendingtransactions  = getpendingtransaction.value;
                this.totalPendingtransactions = this.Pendingtransactions.length;
                this.ngxService.stopLoader('loader-03');
                this.loading = false;
      },
      error => {
        this.loading = false;
        this.ngxService.stopLoader('loader-03');
      }
    );

    this.infinity.getconfirmtransaction('2020-01-03', '2021-3-03').subscribe(
      data => {
                const getconfirmtransaction: any = data;
                this.confirmtransactions  = getconfirmtransaction.value;
                this.totalConfirmtransaction = this.confirmtransactions.length;
                this.ngxService.stopLoader('loader-02');
                this.loading = false;
      },
      error => {
        this.loading = false;
        this.ngxService.stopLoader('loader-02');
      }
    );
  }

  searchData(){

  const dateFrom: any =this.dateSearch.DateFrom;
  const DateTo: any =this.dateSearch.DateTo;
  this.ngxService.startLoader('loader-03');

  this.infinity.getpendingtransaction(dateFrom, DateTo).subscribe(
    data => {
            const getpendingtransaction: any = data;
            this.Pendingtransactions  = getpendingtransaction.value;
            this.totalPendingtransactions = this.Pendingtransactions.length;
            this.ngxService.stopLoader('loader-03');
            this.loading = false;
    },
    error => {
      this.ngxService.stopLoader('loader-03');
    }
  );
  }
  searchData2(){

    console.log(this.dateSearch);

    const dateFrom: any =this.dateSearch.DateFrom;
    const DateTo: any =this.dateSearch.DateTo;
    this.ngxService.startLoader('loader-02');

    this.infinity.getconfirmtransaction(dateFrom, DateTo).subscribe(
      data => {
              const getconfirmtransaction: any = data;
              this.confirmtransactions  = getconfirmtransaction.value;
              this.totalConfirmtransaction = this.confirmtransactions.length;
              this.ngxService.stopLoader('loader-02');
              this.loading = false;
      },
      error => {
        this.ngxService.stopLoader('loader-02');
      }
    );
    }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  validateNow(): void{
    this.loading = true;
    this.ngxService.startLoader('loader-01');
    this.infinity.validate(this.validate).subscribe(
      data => {

        this.loading = false;
        const Validate: any = data;
        this.validisFailure = Validate.isFailure;
        this.validisSuccess = Validate.isSuccess;
        this.validtimestamp = Validate.timestamp;
        this.payloads  = Validate.value;
        this.payloadsCount = this.payloads.length;

        this.valuesuccess = this.payloads.success;
        this.validmessage = this.payloads.message;
        this.validData = this.payloads.data;

        if (this.valuesuccess === true){
          this.current += 1;
          this.changeContent();

          this.form.debitAccountNumber = this.payloads.debitAccountNumber;
          this.form.debitAccountName = this.payloads.debitAccountName;
          this.form.creditAccountNumber = this.payloads.creditAccountNumber;
          this.form.creditAccountName = this.payloads.creditAccountName;
          this.form.customerAccountNumber = this.payloads.customerAccountNumber;
          this.form.bankName = this.payloads.bankName;
          this.form.branchName = this.payloads.branchName;
          this.form.expectedAmount = this.payloads.expectedAmount;
          this.form.expectedDate = this.payloads.expectedDate;
          this.form.uniqueDepositReference = this.payloads.uniqueDepositReference;
          this.form.actualAmount = this.payloads.actualAmount;
          this.form.actualDate = this.payloads.actualDate;
          this.form.customerNarration = this.payloads.customerNarration;
          this.form.cbnCode = this.payloads.cbnCode;
          this.form.bankUniqueReference = this.payloads.bankUniqueReference;
          this.form.debitDate = this.payloads.debitDate;
                  // this.form.createdBy = this.payloads;
          this.form.teller =  this.payloads.hash;
        }else{
          this.type = 'error';
          this.notification.create(
            this.type,
            'Operation not successfull',
            this.validmessage,
          );
        }
        this.ngxService.stopLoader('loader-01');
      },
      error => {
        this.ngxService.stopLoader('loader-01');
      }
    );
  }


  onSearch(){
    const filter: any = this.search.student;

  }

  onSearchCouncle(){
    this.search.student = '';

  }

  back(): void {
    this.current = 0;
    this.changeContent();
    // this.data[0] = this.form;
  }

  next(): void {
    this.current += 1;
    this.changeContent();
    // this.data[0] = this.form;
  }

  again(): void{

    this.form.debitAccountNumber = '';
    this.form.debitAccountName = '';
    this.form.creditAccountNumber = '';
    this.form.creditAccountName = '';
    this.form.customerAccountNumber = '';
    this.form.bankName = '';
    this.form.branchName = '';
    this.form.expectedAmount = '';
    this.form.expectedDate = '';
    this.form.uniqueDepositReference = '';
    this.form.actualAmount = '';
    this.form.actualDate = '';
    this.form.customerNarration = '';
    this.form.cbnCode = '';
    this.form.bankUniqueReference = '';
    this.form.debitDate = '';
    this.form.teller =  '';
    this.current = 0;
    this.changeContent();
    // this.showsDetails = false;
  }

  open(): void {
    this.again();
    this.actionBotton = 'create';
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  tab(val): void {

    if (val === 'all-transactions') {
        this.currenttab = 0;
        this.changeContent2();
      }

    if (val === 'pending-transactions') {
        this.currenttab = 1;
        this.changeContent2();
      }

    if (val === 'approved-transactions') {
        this.currenttab = 2;
        this.changeContent2();
      }
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      case 3: {
        this.index = 'Fourth-content';
        break;
      }
      case 4: {
        this.index = 'fifth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  changeContent2(): void {
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
        this.indextab = 'third-content';
        break;
      }
      default: {
        this.indextab = 'error';
      }
    }
  }

  onSubmit(): void{
    this.disabled = true;
    this.ngxService.startLoader('loader-01');
    this.form.createdBy = localStorage.getItem('user');
    console.log(this.form);
    this.infinity.addTransaction(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  onUpdate(): void{
    this.disabled = true;
    this.ngxService.startLoader('loader-01');
    this.calStudents.UpdateStudent(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data): void{
    this.disabled = false;
    this.ngxService.stopLoader('loader-01');

    const value: any = data.value;
    this.valueIsSuccess = value.isSuccess;
    this.returnMessage = value.returnMessage;
    this.isSuccess = data.isSuccess;
    this.error = data.error;
    this.timestamp = data.timestamp;
    this.isFailure = data.isFailure;
    this.ngOnInit();

    if (this.error === true) {
      this.current += 1;
      this.changeContent();
      this.type = 'success';
      this.notification.create(
        this.type,
        'Operation successfull',
        this.returnMessage
      );
    }else{
      this.type = 'error';
      this.notification.create(
        this.type,
        'Operation not successfull',
        this.returnMessage,
      );
    }

  }

  handleError(error): void{
    this.disabled = false;
    this.ngxService.stopLoader('loader-01');

    this.isSuccess = error.error.isSuccess;
    this.error = error.error.error;
    this.timestamp = error.error.timestamp;
    this.isFailure = error.error.isFailure;


    if (this.error === true) {
      this.current += 1;
      this.changeContent();
      this.type = 'error';
      this.notification.create(
        this.type,
        this.Title,
        this.Detail
      );
    }

  }
}
