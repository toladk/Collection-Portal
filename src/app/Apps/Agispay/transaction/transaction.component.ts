import { Component, OnInit } from '@angular/core';
import { AgisService } from './../../../Services/AgisService/agis.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AgisModel } from './../model/agismodel';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { paginateData } from '../../../utilities/pagination.js';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  listOfCurrentPageData = [];

  pageSize = 10;
  currentPage = 0;
  totalPages: any;
  tempTransactionList = [];

  transactionForm: FormGroup;

  error: string;
  submitted = false;
  allTransactionResult = [];
  usernameResult = [];
  permissionList = [];

  show = false;
  show2 = true;

  transac: any;
  id: any;

  // for buttons
  size: NzButtonSize = 'small';

  allPendingTransactionList: AgisModel[] = [];
  allTransactionList: AgisModel[] = [];
  allFailedTransactionList: AgisModel[] = [];
  allApprovedTransactionList: AgisModel[] = [];
  allRejectedTransactionList: AgisModel[] = [];

  // For dropdown
  allPaymentForList = [];
  allCadestralZoneList = [];
  allIdentityList = [];

  // form builder and ngModel
  transForm = {
    nameOfPlotOwner: "",
    emailOfPlotOwner: "",
    plotOwnerPhoneNumber: "",
    occupation: "",
    dateOfBirth: "",
    address: "",
    idType: "",
    idNumber: "",
    cadestralZone: "",
    plotNumber: "",
    amount: "",
    paymentFor: "",
    paymentDescription: "",
    depositorSlip: "",
    depositorPhoneNumber: "",
    depositorName: "",
    fileNumber: "",
  };

  // for searching
  searchValue: string;

  // Pagination
  pagination = 1;
  pendingPagination = 1;
  approvedPagination = 1;
  rejectedPagination = 1;
  failedPagination = 1;

  //Drawer
  drawerOpen = false;
  drawerOpen2 = false;
  drawerOpen3 = false;
  drawerOpen4 = false;
  drawerOpen5 = false;
  drawerOpen6 = false;
  drawerOpen7 = false;
  drawerOpen8 = false;

  // For Tabs
  indextab = 'First-content';
  index = 'First-content';
  rbatchId: any;
  currenttab = 0;
  batchNumber: any;
  current =  0;
  filteredItems: any;

  constructor(
    private agisService: AgisService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      payment_Id:[''],
      nameOfPlotOwner: ['', Validators.required],
      emailOfPlotOwner: ['', Validators.required],
      plotOwnerPhoneNumber: ['', Validators.pattern('^[0-9ñÑáéíóúÁÉÍÓÚ ]+$')],
      occupation: ['', Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      idType: ['', Validators.required],
      idNumber: ['', Validators.required],
      cadestralZone: ['', Validators.required],
      plotNumber: ['', Validators.required],
      amount: ['', Validators.required],
      paymentFor: ['', Validators.required],
      paymentDescription: ['', Validators.required],
      depositorSlip: ['', Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')],
      depositorPhoneNumber: ['', Validators.pattern('^[0-9ñÑáéíóúÁÉÍÓÚ ]+$')],
      depositorName: ['', Validators.required],
      fileNumber: ['', Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')],
      comment: ['', Validators.required],
    });


    this.getPaymentFor();
    this.getCadestralZone();
    this.getIdentity();
    this.getUserByUsername();
    this.getAllTransactions();

  }

  onCurrentPageDataChange(listOfCurrentPageData) {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  open(): void {
    this.drawerOpen = true;
  }
  close(){
    this.drawerOpen = false;
  }

  open2(): void {
    this.drawerOpen2 = true;
    console.log("checking form value", this.transactionForm.value);
  }
  close2(){
    this.drawerOpen2 = false;
  }

  open3(): void {
    this.drawerOpen3 = true;
  }
  close3(){
    this.drawerOpen3 = false;
  }

  open4(): void {
    this.getAllTransactions()
    this.drawerOpen4 = true;
  }
  close4(){
    this.drawerOpen4 = false;
  }

  open5(): void {
    this.getApprovedTransactions();
    this.drawerOpen5 = true;
  }
  close5(){
    this.drawerOpen5 = false;
  }

  open6(): void {
    this.getFailedTransactions();
    this.drawerOpen6 = true;
  }
  close6(){
    this.drawerOpen6 = false;
  }

  open7(): void {
    this.drawerOpen7 = true;
  }
  close7(){
    this.drawerOpen7 = false;
  }

  open8(): void {
    this.getRejectedTransactions();
    this.drawerOpen8 = true;
  }
  close8(){
    this.drawerOpen8 = false;
  }

  check(){
    console.log(this.transactionForm.value)
  }

  // For tab changes
  tab(val) {
    this.rbatchId = val;
    if (this.rbatchId === 'firstTab') {
        this.currenttab = 0;
        this.changetab();
        this.getAllTransactions();
        this.batchNumber = '';
      }

    if (this.rbatchId === 'secondTab') {
        this.currenttab = 1;
        this.changetab();
        this.getPendingTransactions();
        this.batchNumber = '';
      }

    if (this.rbatchId === 'thirdTab') {
        this.currenttab = 2;
        this.changetab();
        this.getApprovedTransactions();
        this.batchNumber = '';
      }

    if (this.rbatchId === 'fourthTab') {
        this.currenttab = 3;
        this.changetab();
        this.getRejectedTransactions();
        this.batchNumber = '';
      }

    if (this.rbatchId === 'fifthTab') {
        this.currenttab = 4;
        this.changetab();
        this.getFailedTransactions();
        this.batchNumber = '';
      }
  }
  changetab(){
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
      case 4: {
        this.indextab = 'Fifth-content';
        break;
      }

    }
  }


  // Sorting
  key = 'id';
  reverse = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  // Clear Form
  clearForm(){
    this.transactionForm.reset();
  }

  //Post Transaction
  postTransaction(){
    delete this.transactionForm.value.id;
    delete this.transactionForm.value.comment;
    delete this.transactionForm.value.payment_Id;
    this.agisService.addTransaction(this.transactionForm.value).subscribe((result: any) => {
      this.allTransactionResult = result;
      if(result.isSuccess === true){
        this.clearForm();
        this.drawerOpen = false;
        this.drawerOpen2 = false;
        this.getAllTransactions();
        this.getApprovedTransactions();
        this.getFailedTransactions();
        this.getRejectedTransactions();
        this.getPendingTransactions();
        this.notification.success( 'Post Transaction', 'Transaction Posted Sucessfully!!' )
      }
    },error => {
      this.clearForm();
      this.drawerOpen2 = false;
      this.notification.error( 'Post Transaction',error.error )
    });
    console.log(this.transactionForm.value);
  }

  // Update Transaction
  updateTrans(transac){
    this.drawerOpen7 = true;
    this.id = transac.payment_Id;
    this.agisService.getTransactionsById(transac.payment_Id).subscribe((result: any) => {
      this.transactionForm.patchValue({...result.value});
    })
  }
  updateTransaction(){
    this.transactionForm.value.payment_Id = this.id;
    delete this.transactionForm.value.comment;
    this.agisService.updateTransaction(this.transactionForm.value).subscribe((result: any) => {
      this.allTransactionResult = result;
      if(result.isSuccess === true){
        this.clearForm();
        this.drawerOpen4 = false;
        this.drawerOpen7 = false;
        this.getAllTransactions();
        this.getApprovedTransactions();
        this.getFailedTransactions();
        this.getRejectedTransactions();
        this.getPendingTransactions();
        this.notification.success( 'Update Transaction', 'Transaction Updated Sucessfully!!' )
      }
    },error => {
      this.clearForm();
      this.drawerOpen4 = false;
      this.drawerOpen7 = false;
      this.notification.error( 'Post Transaction',error.error )
    })
  }

  // Approve Transaction and Reject
  updateTransApproveAndReject(transac){
    this.drawerOpen3 = true;
    this.id = transac.payment_Id;
    this.agisService.getTransactionsById(transac.payment_Id).subscribe((result: any) => {
      this.transactionForm.patchValue({...result.value});
    })
  }
  approveTransaction(){
    delete this.transactionForm.value.nameOfPlotOwner;
    delete this.transactionForm.value.emailOfPlotOwner;
    delete this.transactionForm.value.plotOwnerPhoneNumber;
    delete this.transactionForm.value.occupation;
    delete this.transactionForm.value.dateOfBirth;
    delete this.transactionForm.value.address;
    delete this.transactionForm.value.idType;
    delete this.transactionForm.value.idNumber;
    delete this.transactionForm.value.cadestralZone;
    delete this.transactionForm.value.plotNumber;
    delete this.transactionForm.value.amount;
    delete this.transactionForm.value.paymentFor;
    delete this.transactionForm.value.paymentDescription;
    delete this.transactionForm.value.depositorSlip;
    delete this.transactionForm.value.depositorPhoneNumber;
    delete this.transactionForm.value.depositorName;
    delete this.transactionForm.value.fileNumber;
    this.transactionForm.value.payment_Id = this.id;
    this.agisService.approveTransaction(this.transactionForm.value).subscribe((result: any) => {
      this.allTransactionResult = result;
      if(result.isSuccess === true){
        this.clearForm();
        this.drawerOpen3 = false;
        this.getPendingTransactions();
        this.notification.success('Approve Transaction', 'Transaction Approved Sucessfully!!')
      }
      if(result.isSuccess === false){
        this.clearForm();
        this.drawerOpen3 = false;
        this.getPendingTransactions();
        this.notification.error('Approve Transaction', 'Insufficient Fund')
      }
    },error => {
      this.clearForm();
      this.drawerOpen3 = false;
      this.notification.error('Approve Transaction', error.error.Error)
    })
  }
  rejectTransaction(){
    delete this.transactionForm.value.nameOfPlotOwner;
    delete this.transactionForm.value.emailOfPlotOwner;
    delete this.transactionForm.value.plotOwnerPhoneNumber;
    delete this.transactionForm.value.occupation;
    delete this.transactionForm.value.dateOfBirth;
    delete this.transactionForm.value.address;
    delete this.transactionForm.value.idType;
    delete this.transactionForm.value.idNumber;
    delete this.transactionForm.value.cadestralZone;
    delete this.transactionForm.value.plotNumber;
    delete this.transactionForm.value.amount;
    delete this.transactionForm.value.paymentFor;
    delete this.transactionForm.value.paymentDescription;
    delete this.transactionForm.value.depositorSlip;
    delete this.transactionForm.value.depositorPhoneNumber;
    delete this.transactionForm.value.depositorName;
    delete this.transactionForm.value.fileNumber;
    this.transactionForm.value.payment_Id = this.id;
    this.agisService.rejectTransaction(this.transactionForm.value).subscribe((result: any) => {
      this.allTransactionResult = result;
      if(result.isSuccess === true){
        this.clearForm();
        this.drawerOpen3 = false;
        this.getPendingTransactions();
        this.notification.success('Reject Transaction', 'Transaction Rejected Sucessfully!!')
      }
    },error => {
      this.clearForm();
      this.drawerOpen3 = false;
      this.notification.error('Reject Transaction', error.error.Error)
    })
  }

  // Get Pending Transactions
  getPendingTransactions(){
    this.agisService.getPendingTransactions().subscribe((result: any) => {
      this.allPendingTransactionList = result.value;
    })
  }

  // Get All Transactions
  getAllTransactions(){
    this.agisService.allTransactions().subscribe((result: any) => {
      this.allTransactionList = result.value;
      this.tempTransactionList = this.allTransactionList;
      this.paginate(this.currentPage, 'pageIndex')
    })
  }

  // Get Approved Transactions
  getApprovedTransactions(){
    this.agisService.approvedTransactions().subscribe((result: any) => {
      this.allApprovedTransactionList = result.value;
    })
  }

  // Get Failed Transactions
  getFailedTransactions(){
    this.show = true;
    this.agisService.failedTransactions().subscribe((result: any) => {
      this.allFailedTransactionList = result.value;
      this.show = false;
      this.show2 = true;
    })
  }

  // Get Failed Transactions
  getRejectedTransactions(){
    this.agisService.getRejectedTransactions().subscribe((result: any) => {
      this.allRejectedTransactionList = result.value;
    })
  }

  // Get Payment For
  getPaymentFor(){
    this.agisService.getPaymentFor().subscribe((result: any) => {
      this.allPaymentForList = result;
    })
  }

  // Get CadestralZone For
  getCadestralZone(){
    this.agisService.getCadestralZone().subscribe((result: any) => {
      this.allCadestralZoneList = result;
    })
  }

  // Get CadestralZone For
  getIdentity(){
    this.agisService.getIdentity().subscribe((result: any) => {
      this.allIdentityList = result;
    })
  }

  // For Permission and User Details
  getUserByUsername(){
    let getUserName = localStorage.getItem('user');
    this.agisService.getUserByUsername(getUserName).subscribe((result: any) =>{
    this.usernameResult = result.roles;
    console.log("checking username", this.usernameResult)
    let agisPayRole = this.usernameResult.find(x=>x.applicationName === "AGISPAY");
    if(agisPayRole === undefined){
      this.router.navigateByUrl('/login');
    }
    else{
      console.log('checking Application Name', agisPayRole);
      agisPayRole.permissions.forEach(permission => {
        this.permissionList.push(permission.name);
      });
      console.log("permissions",this.permissionList);
    }
    })
  }

  // For pagination
  paginate(event, changeType){
    if (changeType === 'pageSize'){
      this.pageSize = event;
      this.currentPage = 0;
    } else {
      this.currentPage = event;
      this.pageSize = 10;
    }

    console.log('temp list', this.tempTransactionList)
    const result = paginateData(this.tempTransactionList, this.currentPage, this.pageSize);
    this.totalPages = result.totalPages;
    this.currentPage = result.currentPage;
    this.allTransactionList = result.content;
    console.log('checking total pages', this.totalPages)
    console.log('current page', this.currentPage)
    console.log('page size', this.pageSize)
    console.log('list', this.allTransactionList)
  }

}
