import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClient } from '@angular/common/http';
import { EgsService } from 'src/app/Services/EgsService/egs.service';
import { DatePipe } from '@angular/common';
import { EgsModel } from '../model/egsmodel';

@Component({
  selector: 'app-egstransaction',
  templateUrl: './egstransaction.component.html',
  styleUrls: ['./egstransaction.component.css']
})
export class EgstransactionComponent implements OnInit {

  transactionForm: FormGroup;
  transactionAddForm: FormGroup;
  approveTransactionForm: FormGroup;

  allTransactionList: EgsModel[] = [];

  visible = false;
  visibleApprove = false;
  visibleReject = false;
  visibleView = false;
  loadingTranData = false;
  loadingTranData2 = false;
  show = false;
  show2 = false;
  isLoadingOne = false;
  invoiceInfoShow = false;
  firstTranPage = true;
  isLoadingValidate = false;
  secondTranPage = false;
  isLoadingSubmit = false;
  isLoadingApprove = false;

  // for searching
  searchValue: string;

  // pagination
  default = 1;
  pagination: number;
  itemsPerPage = 10;

  // Sorting
  key = '';
  reverse = false;

  invoiceDetails: any;
  applicantNameToSend: any;
  amountToSend: any;
  orderIdToSend: any;
  invoiceNoToSend: any;
  referenceNoToSend: any;
  transactionDetails: any;
  deleteTransactionDetails: any;
  transactionId: any;
  approveTransactionDetails: any;
  transactionDetailsById: any;
  usernameResult: any;
  usernameResultForPermission = [];
  permissionList = [];

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private egsService: EgsService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      tranStatus: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });

    this.transactionAddForm = this.formBuilder.group({
      invoiceNo: ['', Validators.required],
      applicantName: ['', Validators.required],
      amount: ['', Validators.required],
      tellerComment: ['', Validators.required],
      depositSlipNo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      orderID: ['', Validators.required],
      applicationType: ['', Validators.required],
      referenceNo: ['', Validators.required],
      createdBy: ['', Validators.required],
    });

    this.approveTransactionForm = this.formBuilder.group({
      tranID: ['', Validators.required],
      userName: ['', Validators.required],
      userComment: ['', Validators.required],
    });

    this.getAllTransactions();
    this.getUserDetails();

  }
  sort(key): void{
    this.key = key;
    this.reverse = !this.reverse;
  }

  open(): void{
    this.visible = true;
  }
  close(): void{
    this.visible = false;
  }
  closeApprove(): void{
    this.visibleApprove = false;
  }
  closeReject(): void{
    this.visibleReject = false;
  }
  closeView(): void{
    this.visibleView = false;
  }

  getAllTransactions(): void{
    this.show = true;
    this.isLoadingOne = true;
    if (this.transactionForm.value.tranStatus === ''){
      this.transactionForm.value.tranStatus = '0';
    }
    if (this.transactionForm.value.fromDate === ''){
      const todayDate = new Date();
      const lastweek = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 7);
      const formatLastWeek = this.datePipe.transform(lastweek, 'yyyy-MM-dd');
      this.transactionForm.value.fromDate = formatLastWeek;
    }
    if (this.transactionForm.value.toDate === ''){
      const todayDate = new Date();
      const nowDate = this.datePipe.transform(todayDate, 'yyyy-MM-dd');
      this.transactionForm.value.toDate = nowDate;
    }
    // tslint:disable-next-line:max-line-length
    this.egsService.getAllTransactions(this.transactionForm.value.tranStatus, this.transactionForm.value.fromDate, this.transactionForm.value.toDate, this.default, this.itemsPerPage).subscribe((result: any) => {
      this.allTransactionList = result.respData;
      this.show = false;
      this.isLoadingOne = false;
      if (this.allTransactionList.length === 0){
        this.show = false;
        this.show2 = true;
        this.notification.warning('Transaction', 'No Data !!');
      } else {
        this.notification.success('Transaction', 'Transaction Fetch Successfully !!');
      }
    }, error => {
      this.show = false;
      this.isLoadingOne = false;
      this.notification.error('Transaction', error.error.respMessage || error.error.message);
    });
  }

  getAllTransactionsPage(pageNumber): void{
    this.show = true;
    this.isLoadingOne = true;
    if (this.transactionForm.value.tranStatus === ''){
      this.transactionForm.value.tranStatus = '0';
    }
    if (this.transactionForm.value.fromDate === ''){
      const todayDate = new Date();
      const lastweek = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 7);
      const formatLastWeek = this.datePipe.transform(lastweek, 'yyyy-MM-dd');
      this.transactionForm.value.fromDate = formatLastWeek;
    }
    if (this.transactionForm.value.toDate === ''){
      const todayDate = new Date();
      const nowDate = this.datePipe.transform(todayDate, 'yyyy-MM-dd');
      this.transactionForm.value.toDate = nowDate;
    }
    // tslint:disable-next-line:max-line-length
    this.egsService.getAllTransactions(this.transactionForm.value.tranStatus, this.transactionForm.value.fromDate, this.transactionForm.value.toDate, pageNumber, this.itemsPerPage).subscribe((result: any) => {
      this.allTransactionList = result.respData;
      this.show = false;
      this.isLoadingOne = false;
      this.notification.success('Transaction', 'Transaction Fetch Successfully !!');
      if (this.allTransactionList.length === 0){
        this.show = false;
        this.show2 = true;
      }
    }, error => {
      this.show = false;
      this.isLoadingOne = false;
      this.notification.error('Transaction', error.error.respMessage || error.error.message);
    });
  }

  validateInvoice(invoiceNo): void{
    this.isLoadingValidate = true;
    this.egsService.getInvoiceByInvoiceNo(invoiceNo).subscribe((result: any) => {
      this.invoiceDetails = result.respData;
      this.notification.success('Invoice', 'Invoice Details Fetch Successfully !!');
      this.isLoadingValidate = false;
      this.invoiceInfoShow = true;


      this.applicantNameToSend = this.invoiceDetails.full_name;
      this.amountToSend = this.invoiceDetails.amount;
      this.orderIdToSend = this.invoiceDetails.order_id;
      this.invoiceNoToSend = this.invoiceDetails.invoice_no;
      this.referenceNoToSend = this.invoiceDetails.reference_code;
    }, error => {
      this.isLoadingValidate = false;
      this.notification.error('Transaction', error.error.respMessage || error.error.message);
    });
  }

  showNextPage(): void{
    this.firstTranPage = false;
    this.secondTranPage = true;
  }
  showPrevPage(): void{
    this.firstTranPage = true;
    this.secondTranPage = false;
  }

  // Submit Transaction
  submitTransaction(): void{
    this.isLoadingSubmit = true;
    this.transactionAddForm.value.createdBy = localStorage.getItem('user');
    this.egsService.postTransaction(this.transactionAddForm.value).subscribe((result: any) => {
      this.transactionDetails = result;
      if (this.transactionDetails.respCode === '00'){
        this.notification.success('Transaction', 'Transaction Created Successfully !!');
        this.isLoadingSubmit = false;
        this.getAllTransactions();
        this.transactionAddForm.reset();
        this.visible = false;
        this.secondTranPage = false;
        this.firstTranPage = true;
        this.invoiceInfoShow = false;
      } else {
        this.notification.error('Transaction', this.transactionDetails.respMessage);
        this.isLoadingSubmit = false;
        this.transactionAddForm.reset();
        this.visible = false;
        this.secondTranPage = false;
        this.firstTranPage = true;
        this.invoiceInfoShow = false;
      }
    }, error => {
      this.isLoadingSubmit = false;
      this.visible = false;
      this.notification.error('Transaction', error.error.respMessage || error.error.message);
    });
  }


  // Approve Transaction
  appro(transacId): void{
    this.visibleApprove = true;
    this.transactionId = transacId;
  }
  approveTransaction(): void{
    this.isLoadingApprove = true;
    this.approveTransactionForm.value.userName = localStorage.getItem('user');
    this.approveTransactionForm.value.tranID = this.transactionId;
    this.egsService.approveTransaction(this.approveTransactionForm.value).subscribe((result: any) => {
      this.approveTransactionDetails = result;
      this.notification.success('Transaction', 'Transaction Approved Successfully !!');
      this.getAllTransactions();
      this.isLoadingApprove = false;
      this.visibleApprove = false;
      this.approveTransactionForm.reset();
    }, error => {
      this.isLoadingApprove = false;
      this.visibleApprove = false;
      this.notification.error('Transaction', error.error.respMessage || error.error.message);
    });
  }

  // Decline Transaction
  rej(transacId): void{
    this.visibleReject = true;
    this.transactionId = transacId;
  }
  rejectTransaction(): void{
    this.isLoadingApprove = true;
    this.approveTransactionForm.value.userName = localStorage.getItem('user');
    this.approveTransactionForm.value.tranID = this.transactionId;
    this.egsService.rejectTransaction(this.approveTransactionForm.value).subscribe((result: any) => {
      this.approveTransactionDetails = result;
      this.notification.success('Transaction', 'Transaction Rejected Successfully !!');
      this.getAllTransactions();
      this.isLoadingApprove = false;
      this.visibleReject = false;
      this.approveTransactionForm.reset();
    }, error => {
      this.isLoadingApprove = false;
      this.visibleReject = false;
      this.notification.error('Transaction', error.error.respMessage || error.error.message);
    });
  }

  // Delete Transaction
  deleteTrans(invoiceNo): void{
    this.egsService.deleteTransaction(invoiceNo).subscribe((result: any) => {
      this.deleteTransactionDetails = result;
      this.notification.success('Transaction', 'Transaction Deleted Successfully !!');
    }, error => {
      this.notification.error('Transaction', error.error.respMessage || error.error.message);
    });
  }

  // View Transaction
  viewTrans(id): void{
    this.visibleView = true;
    this.loadingTranData = true;
    this.loadingTranData2 = false;
    this.egsService.getTransactionByID(id).subscribe((result: any) => {
      this.transactionDetailsById = result.respData;
      this.loadingTranData = false;
      this.loadingTranData2 = true;
      this.notification.success('Transaction', 'Transaction Fetch Successfully !!');
    }, error => {
      this.loadingTranData = false;
      this.visibleView = false;
      this.notification.error('Transaction', error.error.respMessage || error.error.message);
    });
  }

  // adding permissions
  getUserDetails(): void{
    const getUsername = localStorage.getItem('user');
    this.egsService.getUserByUsername(getUsername).subscribe((result: any) => {
      this.usernameResult = result;
      this.usernameResultForPermission = result.roles;

      console.log('checking username', this.usernameResult);
      const centralAdminRole = this.usernameResultForPermission.find(x => x.applicationName === 'EBSPAYAPP');
      if (centralAdminRole === undefined){

      }
      else{
        console.log('checking Application Name', centralAdminRole);
        centralAdminRole.permissions.forEach(permission => {
          this.permissionList.push(permission.name);
        });
        console.log('permissions', this.permissionList);
      }
    });
  }

}
