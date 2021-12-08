import { Component, Injectable, OnInit } from '@angular/core';
import { InfinitypayServicesService } from 'src/app/Services/InfinitypayServices/infinitypay-services.service';
import { RemitaService } from 'src/app/Services/RemitaService/remita.service';
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
import { JarwisService } from 'src/app/Services/jarwis.service';

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
  selector: 'app-remita-payments',
  templateUrl: './remita-payments.component.html',
  styleUrls: ['./remita-payments.component.css']
})
export class RemitaPaymentsComponent implements OnInit {

    listOfOption = [
      {
        NAME: ['Option 01']
      },
      {
        NAME: ['Option 02']
      },
      {
        NAME: ['Option 03']
      },
    ];


    isLoadingOne = false;
    errors = false;
    total = 1;
    listOfRandomUser: RandomUser[] = [];
    loading = true;
    pageSize = 10;
    pageIndex = 0;
    sortField = '';
    sortOrder = 'asc';
    filterStatus = 'Pending';
    filterGender = [
      { text: 'male', value: 'male' },
      { text: 'female', value: 'female' }
    ];


    title = 'codegenerator';
    date = new Date();
    codeGenerated = '';
    evtMsg: any;

    expandSet = new Set<number>();

    public productData = {
      billerId: null,
      categoryId : null,
      products: []
    };

    public customerValidation = {
      billPaymentProductName: null,
      billPaymentProductId : null,
      customerId: null
    };

    public billPayment = {
    billPaymentProductId: null,
    amount: null,
    transactionRef: null,
    name: null,
    email: null,
    phoneNumber: null,
    customerId: null,
    metadata: {
        CustomFields: [  ]
      }
    };

  public paymentNotification = {
    rrr: null,
    amount: null,
    transactionRef: null,
    channel: null,
    rrrAmount: null,
    fee: null,
    metadata:  {
    fundingSource: 'HERITAGE'
   }
  };

    listOfData: any;
    visible = false;
    account = 'new';
    disabled = false;
    OpenRRPayment = false;

    public validate = {
      transref: '',
    };

    public search = {
      SearchRRR: '',
    };

    public dateSearch = {
      DateFrom: '',
      DateTo: '',
    };

    visibleRRR = false;
    index = 'First-content';
    RRRindex = 'First-content';
    indextab = 'First-content';
    current =  0;
    current2 =  0;
    RRRcurrent = 0;
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
  billerCategories: any;
  billersByCategory: any;
  billersProducts: any;
  getProduct: any[];
  getProductDetails: any[];
  getProductCustomerFields: any;
  validationDatas: any;
  validationValues: any;
  validationStatus: any;
  validationMessage: any;
  allTransactions: any;
  allPendingTransactions: any;
  allPendingCount: any;
  reInitiateBillPayment: any;
  successMessage: any;
  private _rrr: any;
  transactionRef: any;
  successAmount: any;
  getRRRDetails: any;
  rrrDetails: any;
  TransactionQuery: any;
  allTransactionQuery: any;
  allApprovedTransactions: any;
  allApprovedCount: any;
  allReInitiateTransactions: any;
  allReInitiateCount: any;
  currentPage: any;
  isApproved: boolean;
  approveTrans = true;
  profResponds: any;
  me: any;
  roles: any;
  role: any;
  permissions: any[];
  rrrDetails2: any;
    constructor(
                private infinity: InfinitypayServicesService,
                private RemitaService: RemitaService,
                private ngxService: NgxUiLoaderService,
                private nzMessageService: NzMessageService,
                private notification: NzNotificationService,
                private modal: NzModalService,
                private actRoute: ActivatedRoute,
                private Jarwis: JarwisService,
    ) { }

    ngOnInit(): void {
      this.ngxService.startLoader('loader-01');
      this.ngxService.startLoader('loader-02');

      this.actRoute.paramMap.subscribe((params => {
        const val = params.get('id');
        this.rbatchId = val;
        this.tab(this.rbatchId);
      }));

      this.RemitaService.billerCategories().subscribe(
        data => {
                  this.loading = false;
                  const billerCategories: any = data;
                  this.billerCategories  = billerCategories.data;
                  this.total = this.billerCategories.length;
                  this.ngxService.stopLoader('loader-01');
        },
        error => {
          this.ngxService.stopLoader('loader-02');
        }
      );

      this.loadDataFromServer(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, this.filterStatus);

      const permissionArray = [];
      this.Jarwis.getMe().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.roles = this.me.roles;
        this.role = this.roles.filter(rol => {
          return rol.applicationName === localStorage.app;
        });
        console.log(this.role[0]);
        console.log(this.role[0].applicationName);
        console.log(this.role[0].permissions);

        this.role[0].permissions.forEach(element => {
        if (element.applicationName === localStorage.app) {
          console.log(element.applicationName);
          permissionArray.push(element.name);
        }
      });
        console.log(permissionArray);
        this.permissions = permissionArray;
      }
    );
    }

  loadDataFromServer(
      pageIndex: number,
      pageSize: number,
      sortField: string | '',
      sortOrder: string | 'asc',
      filterStatus: string | 'Pending'
    ): void {
      // if(pageIndex === 1 || pageIndex === 0){
      //   pageIndex = 0;
      // }else{
      //   const minus: number = pageIndex - 1;
      //   pageIndex = minus * pageSize;
      // }
      console.log('pageIndex' + ' ' + pageIndex);
      console.log('pageSize' + ' ' + pageSize);
      console.log('sortField' + ' ' + sortField);
      console.log('sortOrder' + ' ' + sortOrder);
      console.log('filterStatus' + ' ' + filterStatus);
      this.loading = true;
      this.RemitaService.getTransactionByQuery(pageIndex, pageSize, sortField, sortOrder, filterStatus).subscribe(data => {
                  this.loading = false;
                  const allTransactions: any = data;
                  this.currentPage  = allTransactions.currentPage;
                  this.pageSize  = allTransactions.pageSize;
                  this.totalCount  = allTransactions.totalCount;
                  this.allTransactions  = allTransactions.transactions;
                  // this.total = this.allTransactions.length;
                  this.ngxService.stopLoader('loader-02');

                  this.allPendingTransactions = this.allTransactions.filter(component => {
                    return component.status === 'Pending' && component.rrr !== null;
                  });
                  this.allPendingCount = this.allPendingTransactions.length;

                  this.allReInitiateTransactions = this.allTransactions.filter(component => {
                    return component.status === 'Pending' && component.rrr === null;
                  });
                  this.allReInitiateCount = this.allReInitiateTransactions.length;
      },
      error => {
        this.ngxService.stopLoader('loader-02');
        this.loading = false;
      }
      );

      $('#item_search').on('keyup', function() {
        const value = $(this).val().toLowerCase();
        $('#item tr').filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    }

    onSearch(){
      const sortField: any = this.search.SearchRRR;
      this.RemitaService.getTransactionByQuery(this.pageIndex, this.pageSize, sortField, this.sortOrder, this.filterStatus).subscribe(data => {
        this.loading = false;
        const allTransactions: any = data;
        this.currentPage  = allTransactions.currentPage;
        this.pageSize  = allTransactions.pageSize;
        this.totalCount  = allTransactions.totalCount;
        this.allTransactions  = allTransactions.transactions;
        // this.total = this.allTransactions.length;
        this.ngxService.stopLoader('loader-02');

        this.allPendingTransactions = this.allTransactions.filter(component => {
          return component.status === 'Pending' && component.rrr !== null;
        });
        this.allPendingCount = this.allPendingTransactions.length;

        this.allReInitiateTransactions = this.allTransactions.filter(component => {
          return component.status === 'Pending' && component.rrr === null;
        });
        this.allReInitiateCount = this.allReInitiateTransactions.length;
      },
      error => {
      this.ngxService.stopLoader('loader-02');
      this.loading = false;
      }
      );

    }

    onSearchCouncle(){
      this.search.SearchRRR = '';
      // tslint:disable-next-line:max-line-length
      this.RemitaService.getTransactionByQuery(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, this.filterStatus).subscribe(data => {
        this.loading = false;
        const allTransactions: any = data;
        this.currentPage  = allTransactions.currentPage;
        this.pageSize  = allTransactions.pageSize;
        this.totalCount  = allTransactions.totalCount;
        this.allTransactions  = allTransactions.transactions;
        // this.total = this.allTransactions.length;
        this.ngxService.stopLoader('loader-02');

        this.allPendingTransactions = this.allTransactions.filter(component => {
          return component.status === 'Pending' && component.rrr !== null;
        });
        this.allPendingCount = this.allPendingTransactions.length;

        this.allReInitiateTransactions = this.allTransactions.filter(component => {
          return component.status === 'Pending' && component.rrr === null;
        });
        this.allReInitiateCount = this.allReInitiateTransactions.length;
      },
      error => {
      this.ngxService.stopLoader('loader-02');
      this.loading = false;
      }
      );

    }

    onQueryParamsChange(params: NzTableQueryParams): void {
      console.log(params);
      const { pageSize, pageIndex, sort, filter } = params;
      const currentSort = sort.find(item => item.value !== null);
      const sortField = (currentSort && currentSort.key) || '';
      const sortOrder = (currentSort && currentSort.value) || 'asc';
      this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, this.filterStatus);
    }




    onCategory(e): void{
      this.ngxService.startLoader('loader-02');
      const id: any = e.target.value;
      this.productData.categoryId = e.target.value;
      this.RemitaService.billersByCategory(id).subscribe(
        data => {
          this.ngxService.stopLoader('loader-02');
          const billersByCategory = data;
          this.billersByCategory = billersByCategory.value.data;
          // this.productData.billerId =

          // this.components = JSON.parse(this.dept.components);
          this.next();
        });
    }

    onBiller(e): void{
      this.ngxService.startLoader('loader-02');
      const id: any = e.target.value;
      this.productData.billerId =  e.target.value;
      this.RemitaService.billersProducts(id).subscribe(
        data => {
          this.ngxService.stopLoader('loader-02');
          const billersProducts = data;
          this.billersProducts = billersProducts.value.data;
          this.productData.products = this.billersProducts.products;
          this.next();
        });
    }

    onproduct(e): void{
      const billPaymentProductId: any = e.target.value;
      const permissionArray = [];
      this.getProductDetails = this.productData.products.filter(component => {
        // console.log('finding it', component.billPaymentProductId);
        return component.billPaymentProductId === billPaymentProductId;
      });

      this.getProduct =  this.getProductDetails[0];
      // console.log('checking getproduct', this.getProductDetails[0]);
      this.getProductCustomerFields =  this.getProductDetails[0].metadata.customFields;
      console.log('checking getproduct', this.getProductCustomerFields);

      this.customerValidation.billPaymentProductName =  this.getProductDetails[0].billPaymentProductName;
      this.customerValidation.billPaymentProductId =  this.getProductDetails[0].billPaymentProductId;

      this.billPayment.billPaymentProductId = this.getProductDetails[0].billPaymentProductId;
      this.billPayment.amount = this.getProductDetails[0].amount;

      this.getProductCustomerFields.forEach(element => {
        let bound = {};
        if (element.type === 'multiselect'){
           bound = {
            variable_name: element.variable_name,
            value: []
          };
        }
        else{
           bound = {
            variable_name: element.variable_name,
            value: ''
          };
        }
        permissionArray.push(bound);
      });

      // console.log(permissionArray);

      this.billPayment.metadata.CustomFields = permissionArray;

      // console.log(this.billPayment);
    }

    randomString(): void{
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
      const stringLength = 11;
      let randomstring = '';
      for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
     }
      this.codeGenerated = randomstring;
      this.billPayment.transactionRef = this.codeGenerated;
     }

     InitializePayment(): void{
      this.billPayment.customerId = this.customerValidation.customerId;
      this.ngxService.startLoader('loader-02');
      this.randomString();
      const customerFields = this.billPayment.metadata.CustomFields;
      const newData = customerFields.map(item => {
        if (typeof item.value === 'object'){
          item.value = item.value.toString();
        }
        return item;
      });
      this.billPayment.metadata.CustomFields = newData;
      console.log('Checking Form', this.billPayment);
      this.RemitaService.initiateBillPayment(this.billPayment).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }

    customerValidate(): void{
      this.billPayment.name = '';
      this.isLoadingOne = true;
      delete this.customerValidation.billPaymentProductName;
      this.RemitaService.customerValidation(this.customerValidation).subscribe(
        data => {
                const customerValidation: any = data;
                this.validationDatas  = customerValidation;
                this.errors = true;
                this.ngxService.stopLoader('loader-02');

                this.returnMessage = this.validationDatas.error;
                this.isSuccess = this.validationDatas.isSuccess;

                if (this.isSuccess === true) {

                  this.validationValues  = this.validationDatas.value;
                  this.returnMessage = this.validationValues.message;
                  // this.billPayment.customerId  = this.validationValues.data.customerId;
                  this.billPayment.billPaymentProductId  = this.validationValues.data.billPaymentProductId;
                  // this.billPayment.name  = this.validationValues.data.name;
                  // this.billPayment.email  = this.validationValues.data.email;

                  // this.current += 1;
                  // this.changeContent();
                  this.type = 'success';
                  this.notification.create(
                    this.type,
                    'Successful',
                    this.returnMessage
                  );
                  this.isLoadingOne = false;
                }else{
                  this.type = 'error';
                  this.notification.create(
                    this.type,
                    'Failed',
                    this.returnMessage,
                  );
                  this.isLoadingOne = false;
                }

        },
        error => {
          this.ngxService.stopLoader('loader-02');
          this.isLoadingOne = false;
        }
      );
      }

    reInitiate(id): void{
      // this.ngxService.startLoader('loader-03');
      // this.RemitaService.reInitiateBillPayment(id).subscribe(
      //   data => {
      //           const reInitiateBillPayment: any = data;
      //           this.reInitiateBillPayment  = reInitiateBillPayment;
      //           this.errors = true;
      //           this.ngxService.stopLoader('loader-03');

      //           this.errorMessage = this.reInitiateBillPayment.error;
      //           this.isSuccess = this.validationDatas.isSuccess;
      //           this.isFailure = this.validationDatas.isFailure;
      //           this.timestamp = this.validationDatas.timestamp;


      //           if (this.reInitiateBillPayment.isSuccess === true) {
      //             this.type = 'success';
      //             this.notification.success('Re-Initiate Transaction', 'Transaction Initiated Successfully !!');
      //           }

      //   },
      //   error => {
      //     this.ngxService.stopLoader('loader-03');
      //     this.notification.error('Re-Initiate Transaction', error.error.error || error.error.errorMessage);
      //   }
      // );

      this.RemitaService.reInitiateBillPayment(id).subscribe((result: any) => {
        this.reInitiateBillPayment = result;
        if (this.reInitiateBillPayment.isSuccess === false){
          this.notification.success('Re-Initiate Transaction', this.reInitiateBillPayment.error || this.reInitiateBillPayment.respMessage);
        }
      }, error => {
        this.notification.error('Re-Initiate Transaction', error.error.error || error.error.errorMessage);
      });
    }

    getRrrDetails(): void{

      if (this.paymentNotification.rrr !== '') {
        this.ngxService.startLoader('loader-04');
        this.RemitaService.getRRRDetails(this.paymentNotification.rrr).subscribe(
          data => {
                  const getRRRDetails: any = data;
                  this.getRRRDetails  = getRRRDetails.value;
                  this.errors = true;
                  this.ngxService.stopLoader('loader-04');
                  this.errorMessage = getRRRDetails.error;
                  this.isSuccess = getRRRDetails.isSuccess;
                  this.isFailure = getRRRDetails.isFailure;

                  if (this.isSuccess) {

                    this.rrrDetails = this.getRRRDetails.data;
                    console.log('checking', this.rrrDetails2);
                    this.RRRcurrent += 1;
                    this.changeRRR();
                    this.type = 'success';
                    this.notification.create(
                      this.type,
                      'Successful',
                      this.errorMessage
                    );
                  }else{

                    this.RRRcurrent += 1;
                    this.changeRRR();
                    this.type = 'error';
                    this.notification.create(
                      this.type,
                      'Failed',
                      this.errorMessage,
                    );
                  }

          },
          error => {
            this.ngxService.stopLoader('loader-04');
          }
        );
      } else {
        this.modal.error({
            nzTitle: 'Failed',
            nzContent: 'Feild is Empty. <br/> Provide customer rrr code to proceed with the transaction'
          });
        }
    }

    transactionQuery(id): void{

      if (id !== null) {
        this.randomString();
        // this.again();
        this.ngxService.startLoader('loader-03');
        this.RemitaService.getTransactionById(id).subscribe(
          data => {
                  this.errors = true;
                  this.ngxService.stopLoader('loader-03');
                  this.visibleRRR = true;
                  const transactionQuery: any = data;
                  this.allTransactionQuery  = transactionQuery.value;
                  this.errorMessage = transactionQuery.error;
                  this.isSuccess = transactionQuery.isSuccess;
                  this.isFailure = transactionQuery.isFailure;
                  this.rrrDetails = this.allTransactionQuery;
                  this.rrrDetails2 = this.allTransactionQuery.rrrLookUpResponse;
                  console.log('checking', this.rrrDetails2);

                  this.paymentNotification.rrr = this.rrrDetails.rrr;
                  this.paymentNotification.amount = this.rrrDetails.amount;
                  this.paymentNotification.transactionRef = this.billPayment.transactionRef;
                  this.paymentNotification.channel = 'wed';
                  this.paymentNotification.metadata = {fundingSource: 'HERITAGE'}

                  console.log( this.paymentNotification);
          },
          error => {
            this.ngxService.stopLoader('loader-03');
          }
        );
      } else {
        this.modal.error({
            nzTitle: 'Operation Not Soccessful',
            nzContent: 'RRR Code have not been Generated...'
          });
        }
    }

    PaymentNotification(): void{
      this.ngxService.startLoader('loader-05');
      this.paymentNotification.rrr = this.rrrDetails2.rrr;
      this.paymentNotification.amount = this.rrrDetails2.amount;
      this.paymentNotification.rrrAmount = this.rrrDetails2.rrrAmount;
      this.paymentNotification.fee = this.rrrDetails2.fee;
      this.paymentNotification.transactionRef = this.billPayment.transactionRef;
      this.paymentNotification.channel = 'wed';
      this.paymentNotification.metadata = {fundingSource: 'HERITAGE'};
      this.RemitaService.billPaymentNotification(this.paymentNotification).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }


    onExpandChange(id: number, checked: boolean): void {
      if (checked) {
        this.expandSet.add(id);
      } else {
        this.expandSet.delete(id);
      }
    }


    back(): void {
      this.current = this.current - 1;
      this.changeContent(); this.changeRRR();

    }

    next(): void {
      this.current += 1;
      this.RRRcurrent += 1;
      this.changeContent(); this.changeRRR();
      // this.data[0] = this.form;
    }

    next2(): void{
      this.current += 1;
      this.changeContent();
    }

    again(): void{

      this.paymentNotification.rrr = '';
      this.paymentNotification.amount = '';
      this.paymentNotification.transactionRef = '';
      this.paymentNotification.channel = '';
      this.paymentNotification.metadata = null;
      this.validate.transref = '';
      this.customerValidation.billPaymentProductId = '';
      this.customerValidation.customerId = '';
      this.billPayment.billPaymentProductId = '';
      this.billPayment.amount = '';
      this.billPayment.name = '';
      this.billPayment.email = '';
      this.billPayment.phoneNumber = '';
      this.billPayment.customerId = '';
      this.rrrDetails = false;
      this.currenttab = 0;
      this.current = 0;
      this.RRRcurrent = 0;
      this.changeContent(); this.changeRRR();
      // this.showsDetails = false;
      location.reload();
    }

    open(): void {
      // this.again();
      this.actionBotton = 'create';
      this.visible = true;
    }

    openRRRPayment(): void {
      // this.again();
      this.currenttab = 0;
      this.changeContent(); this.changeRRR();
      this.actionBotton = 'create';
      this.OpenRRPayment = true;
    }

    openRRR(): void {
      // this.again();
      this.visibleRRR = true;
    }

    closeRRR(): void {
      this.again();
      this.visibleRRR = false;
    }

    closeRRPayment(): void {
      this.again();
      this.OpenRRPayment = false;
    }

    close(): void {
      this.again();
      this.visible = false;
      window.location.reload();
    }

    tab(val): void {

      if (val === 'all-transactions') {
          this.isApproved = false;
          this.filterStatus = 'Pending';
          this.currenttab = 0;
          this.changeContent2();
        }

      if (val === 'pending-transactions') {
          this.isApproved = false;
          this.filterStatus = 'Pending';
          this.currenttab = 1;
          this.changeContent2();
        }

      if (val === 'approved-transactions') {
          this.isApproved = true;
          this.filterStatus = 'Approved';
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
        case 5: {
          this.index = 'sixth-content';
          break;
        }
        default: {
          this.index = 'error';
        }
      }
    }


    changeRRR(): void {

      switch (this.RRRcurrent) {
        case 0: {
          this.RRRindex = 'First-content';
          break;
        }
        case 1: {
          this.RRRindex = 'Second-content';
          break;
        }
        case 2: {
          this.RRRindex = 'third-content';
          break;
        }
        case 3: {
          this.RRRindex = 'Fourth-content';
          break;
        }
        case 4: {
          this.RRRindex = 'fifth-content';
          break;
        }
        case 5: {
          this.RRRindex = 'sixth-content';
          break;
        }
        default: {
          this.RRRindex = 'error';
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



    handleResponse(data): void{
      this.disabled = false;
      this.ngxService.stopLoader('loader-01');
      this.ngxService.stopLoader('loader-02');
      this.ngxService.stopLoader('loader-03');
      this.ngxService.stopLoader('loader-04');
      this.ngxService.stopLoader('loader-05');
      const value: any = data;

      this.isFailure = value.isFailure;
      this.isSuccess = value.isSuccess;
      this.timestamp = value.timestamp;
      this.errorMessage = value.error;

      this.ngOnInit();

      if (this.isSuccess === true) {
        this.successMessage = value.value.message;
        this._rrr = value.value.data.rrr;
        this.transactionRef = value.value.data.transactionRef;
        this.successAmount = value.value.data.amount;
        this.current += 1;
        this.changeContent();
        this.approveTrans = false;
        this.type = 'success';
        this.notification.create(
          this.type,
          'Operation successfull',
          this.successMessage

        );
      }else{
        this.current += 1;
        this.changeContent();
        this.type = 'error';
        this.notification.create(
          this.type,
          'Operation not successfull',
          this.errorMessage,
        );
      }

    }

    handleError(error): void{
      this.disabled = false;
      this.ngxService.stopLoader('loader-01');
      this.ngxService.stopLoader('loader-02');
      this.ngxService.stopLoader('loader-03');
      this.ngxService.stopLoader('loader-04');
      this.ngxService.stopLoader('loader-05');

      const value: any = error.error;

      this.isFailure = value.isFailure;
      this.isSuccess = value.isSuccess;
      this.timestamp = value.timestamp;
      this.errorMessage = value.error;

      this.type = 'error';
      this.notification.create(
          this.type,
          'Opeation not successful,',
          this.errorMessage
        );

      this.current += 1;
      this.changeContent(); this.changeRRR();

    }
  }

