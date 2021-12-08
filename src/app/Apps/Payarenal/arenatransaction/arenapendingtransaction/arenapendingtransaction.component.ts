import { Component, OnInit } from '@angular/core';
import { Faketable } from './../../model/faketable';
import { PayarenaModel } from './../../model/payarenamodel';
import { HttpClient } from '@angular/common/http';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayarenaendpointsService } from './../../../../Services/PayarenalServices/payarenaendpoints.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arenapendingtransaction',
  templateUrl: './arenapendingtransaction.component.html',
  styleUrls: ['./arenapendingtransaction.component.css']
})
export class ArenapendingtransactionComponent implements OnInit {
  isShown = false ;
  isShown2 = true ;

  tableDetails: Faketable[] = [];
  allPendingTransactionList: PayarenaModel[] = [];
  allApprovedTransactionList: PayarenaModel[] = [];
  allDeclinedTransactionList: PayarenaModel[] = [];
  allLastPendingTransactionList: PayarenaModel[] = [];

  allTransactionResult = [];
  usernameResult: any;
  permissionList = [];
  usernameResultForPermission = [];

  // for field
  bindPending = 'Pending';
  bindApproved = 'Approved';
  bindDeclined = 'Declined';

  submitted = false;
  tranPendingTransForm: FormGroup;

  drawerOpen = false;
  drawerOpen2 = false;

  // for buttons
  size: NzButtonSize = 'small';

  // for searching
  searchValue: string;

  transac: any;
  id: any;

  // Pagination
  pagination: number = 1;

  // form binding on API Call
  formCreatedBy: any;
  formAuthorizeId: any;

  // for last 10 pending trans
  tranStatusDetail = 0;
  days = 7;
  date = new Date();
  res = this.date.setTime(this.date.getTime() - (this.days * 24 * 60 * 60 * 1000));
  fromDateDetail = new Date(this.res);
  toDateDetail = new Date();

  // For Tabs
  indextab = 'First-content';
  index = 'First-content';
  rbatchId: any;
  currenttab = 0;
  batchNumber: any;
  current =  0;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private payArenaService: PayarenaendpointsService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.tranPendingTransForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      tranStatus: ['', Validators.required],
      appid: ['', Validators.required],
      amount: ['', Validators.required],
      cbnBankCode: ['', Validators.required],
      authorizeId: ['', Validators.required],
      depositSlipNo: ['', Validators.required],
      collectionCode: ['', Validators.required],
      phoneNumber: ['', Validators.pattern('^[0-9ñÑáéíóúÁÉÍÓÚ ]+$')],
      applicantId: ['', Validators.required],
      applicantName: ['', Validators.required],
      applicationType: ['', Validators.required],
      referenceNo: ['', Validators.required],
      createdBy: ['', Validators.required],
      tranID: ['', Validators.required],
      userName: ['', Validators.required],
      userComment: ['', Validators.required],
    });

    this.getLastPendingTransactions( this.tranStatusDetail, this.fromDateDetail, this.toDateDetail );
    this.getUserDetails();


  }

  open(): void {
    this.getUserDetails();
    this.drawerOpen = true;
  }
  close(){
    this.drawerOpen = false;
  }

  open2(): void {
    this.drawerOpen2 = true;
  }
  close2(){
    this.drawerOpen2 = false;
  }

  // Sorting
  key: string = 'createdOn';
  reverse: boolean = false;
  sortCreated(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  // Clear Form
  clearForm(){
    this.tranPendingTransForm.reset();
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

    if (this.rbatchId === 'fourthTab') {
        this.currenttab = 3;
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
      case 3: {
        this.indextab = 'Fourth-content';
        break;
      }

    }
  }

  //Post Transaction
  postTransaction(){
    delete this.tranPendingTransForm.value.id;
    delete this.tranPendingTransForm.value.fromDate;
    delete this.tranPendingTransForm.value.toDate;
    delete this.tranPendingTransForm.value.tranID;
    delete this.tranPendingTransForm.value.tranStatus;
    delete this.tranPendingTransForm.value.userComment;
    this.payArenaService.addTransaction(this.tranPendingTransForm.value).subscribe((result: any) => {
      this.allTransactionResult = result;
      if(result.isSuccess === true){
        this.clearForm();
        this.getLastPendingTransactions(this.tranStatusDetail, this.fromDateDetail, this.toDateDetail);
        this.drawerOpen = false;
        this.notification.success( 'Post Transaction', 'Transaction Posted Sucessfully!!' )
      }
    },error => {
      this.clearForm();
      this.drawerOpen = false;
      this.notification.error( 'Post Transaction', error.error )
    });
  }

  //Approve Transaction
  apprTrans(transac){
    this.getUserDetails();
    this.drawerOpen2 = true;
    this.id = transac.id;
    this.payArenaService.getTransactionById(transac.id).subscribe((result: any) => {
      this.tranPendingTransForm.patchValue({...result.value});
    })
  }
  approveTransaction(){
    delete this.tranPendingTransForm.value.id;
    delete this.tranPendingTransForm.value.tranStatus;
    delete this.tranPendingTransForm.value.fromDate;
    delete this.tranPendingTransForm.value.toDate;
    delete this.tranPendingTransForm.value.appid;
    delete this.tranPendingTransForm.value.amount;
    delete this.tranPendingTransForm.value.cbnBankCode;
    delete this.tranPendingTransForm.value.authorizeId;
    delete this.tranPendingTransForm.value.depositSlipNo;
    delete this.tranPendingTransForm.value.collectionCode;
    delete this.tranPendingTransForm.value.phoneNumber;
    delete this.tranPendingTransForm.value.applicantId;
    delete this.tranPendingTransForm.value.applicantName;
    delete this.tranPendingTransForm.value.applicationType;
    delete this.tranPendingTransForm.value.referenceNo;
    delete this.tranPendingTransForm.value.createdBy;
    this.tranPendingTransForm.value.tranID = this.id;
    this.tranPendingTransForm.value.userName = localStorage.getItem('user');
    this.payArenaService.approveTransaction(this.tranPendingTransForm.value).subscribe((result: any) => {
      this.allTransactionResult = result;
      if(result.isSuccess === true){
        this.clearForm();
        this.drawerOpen2 = false;
        this.getPendingTransactions();
        this.notification.success('Approve Transaction', 'Transaction Approved Sucessfully!!')
      } else if (result.isSuccess === false){
          this.clearForm();
          this.drawerOpen2 = false;
          this.notification.error('Approve Transaction', 'Error occur posting to finacle. Could not approve this transaction.')
      }
    },error => {
      this.clearForm();
      this.drawerOpen2 = false;
      this.notification.error('Approve Transaction', error.error)
    })
  }

  // Get Pending Transactions
  getPendingTransactions(){
    this.isShown = !this.isShown;
    this.isShown2 = this.isShown2;
    this.payArenaService.getAllTransactions( this.tranPendingTransForm.value.tranStatus, this.tranPendingTransForm.value.fromDate, this.tranPendingTransForm.value.toDate ).subscribe((result: any) => {
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
    this.isShown = !this.isShown;
    this.isShown2 = this.isShown2;
    this.payArenaService.getAllTransactions( this.tranPendingTransForm.value.tranStatus, this.tranPendingTransForm.value.fromDate, this.tranPendingTransForm.value.toDate ).subscribe((result: any) => {
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

  // Get Declined Transactions
  getDeclinedTransactions(){
    this.isShown = !this.isShown;
    this.isShown2 = this.isShown2;
    this.payArenaService.getAllTransactions( this.tranPendingTransForm.value.tranStatus, this.tranPendingTransForm.value.fromDate, this.tranPendingTransForm.value.toDate ).subscribe((result: any) => {
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

  // Get Last 10 Pending Transactions
  getLastPendingTransactions(tranStatus, fromDate, toDate ){
    this.isShown = !this.isShown;
    this.isShown2 = this.isShown2;
    this.payArenaService.getAllTransactions( tranStatus, fromDate, toDate ).subscribe((result: any) => {
      this.allLastPendingTransactionList = result.value;
      console.log('checking trans', this.allLastPendingTransactionList);
      if(result.isSuccess === true){
        this.isShown = this.isShown;
        this.notification.success( 'Transactions', 'Transactions Loaded Sucessfully!!' )
      }
      this.isShown = ! this.isShown;
    },error => {
      this.notification.error('Transactions', error.error)
    })
  }

  //adding createdby and authorizeId to form and permissions
  getUserDetails(){
    let getUsername = localStorage.getItem('user');
    this.payArenaService.getUserByUsername(getUsername).subscribe((result: any) => {
      this.usernameResult = result;
      this.usernameResultForPermission = result.roles;

      this.formCreatedBy = this.usernameResult.username;
      this.formAuthorizeId = this.usernameResult.id;

      console.log("checking username", this.usernameResult)
      let centralAdminRole = this.usernameResultForPermission.find(x => x.applicationName === "PAYARENA");
      if (centralAdminRole === undefined){

      }
      else{
        console.log('checking Application Name', centralAdminRole);
        centralAdminRole.permissions.forEach(permission => {
          this.permissionList.push(permission.name);
        });
        console.log("permissions", this.permissionList);
      }

    })
  }

}
