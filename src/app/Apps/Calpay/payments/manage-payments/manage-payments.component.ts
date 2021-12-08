import { Component, Injectable, OnInit } from '@angular/core';
import { CalpayStudentService } from 'src/app/Services/CalpayServices/calpay-student.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { CalpayModel } from './../../model/calpaymodel';

interface ItemData {
  name: string;
  age: number;
  address: string;
}

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
  selector: 'app-manage-payments',
  templateUrl: './manage-payments.component.html',
  styleUrls: ['./manage-payments.component.css']
})
export class ManagePaymentsComponent implements OnInit {

  listOfData: any;
  visible = false;
  account = 'new';
  disabled = false;

  public deleteStudent = {
    Id: null,
    DeleteKey: ''
  };

  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 0;
  sortField = 'MatricNumber';
  sortOrder = 'asc';
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];

  public search = {
    student: '',
  };

  public Paymentform = {
    StudentId: '',
    SessionId: '',
    ProgramId: '',
    SchoolFee: 0,
    Description: '',
    CreatedBy: '',
    PaymentItem: {
      RequestId: null,
      SlipNo: '',
      AmountPaid: 0,
      DepositorName: '',
      DepositorPhoneNo: '',
      DepositorEmail: '',
      DepositorAddress: '',
      PaymentType: '',
      PaymentMethod: '',
      Description: '',
      CreatedBy: ''
    },
  };

  public form = {
    Id: '',
    Title: '',
    LastName: '',
    FirstName: '',
    OtherName: '',
    Address: '',
    PhoneNo: '',
    MatricNumber: '',
    Email: '',
    Description: '',
    CreatedBy: ''
  };

  public balancePayload = {
    RequestId: null,
    SlipNo: '',
    AmountPaid: '',
    DepositorName: '',
    DepositorPhoneNo: '',
    DepositorEmail: '',
    DepositorAddress: '',
    PaymentType: '',
    PaymentMethod: '',
    Description: '',
    CreatedBy: ''
}

  panels = [
    {
      active: true,
      name: 'Student Details',
      childPanel: [
        {
          active: false,
          name: 'This is panel header 1-1'
        }
      ]
    },
  ];

  getPaymentDetail: CalpayModel;
  getPaymentDetails: any;
  index = 'First-content';
  index2 = 'First-content';
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
  public toolbarOptions: ToolbarItems[];
  currenttab = 0;
  indextab = 'First-content';
  rbatchId: any;
  batchNumber: any;
  visibletab = false;
  tableCount: any;
  totalCount: any;
  sessions: any;
  programs: any;
  session: any;
  programByID: any;
  programAmount: any;
  programSessionName: any;
  programProgramName: any;
  paymentStatus: any;
  profResponds: any;
  me: any;
  myEmail: any;
  listOfDataPatial: any;
  totalPatial: any;
  tableCountPatial: any;
  totalCountPatial: any;
  paymentId: any;
  TotalPayments: number;
  TotalCharges: any;
  roles: any;
  permissions: any[];
  role: any;
  programCharges: any;
  BankCharges: any;

  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private calStudents: CalpayStudentService,
    private ngxService: NgxUiLoaderService,
    private nzMessageService: NzMessageService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private Jarwis: JarwisService,
  ) { }

  ngOnInit(): void {

    this.ngxService.startLoader('loader-02');
    this.loadDataFromServer(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, []);
    this.loadDataFromServerPatial(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, []);

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

    this.calStudents.getSessions().subscribe(
      data => {
                const getSessions: any = data;
                this.sessions  = getSessions.Response;
      },
      error => {

      }
    );


    this.toolbarOptions = ['Search'];
  }

  onselectSession(event): void{
    this.ngxService.startLoader('loader-01');
    const eventValue: any = event.target.value;
    this.session = event.target.value;
    this.Paymentform.SessionId = this.session,
    this.calStudents.getProgram(eventValue).subscribe(
      data => {
                const getProgram: any = data;
                this.programs  = getProgram.Response;
                this.ngxService.stopLoader('loader-01');
      },
      error => {

      }
    );
  }
  onselectProgram(event): void{
    this.ngxService.startLoader('loader-01');
    const eventValue1: any = this.session;
    const eventValue2: any = event.target.value;
    this.Paymentform.ProgramId = eventValue2,

    this.calStudents.getProgramByID(eventValue1, eventValue2).subscribe(
      data => {
                const getProgramByID: any = data;
                this.programByID  = getProgramByID.Response;
                this.programCharges  = getProgramByID.Response.BankCharges;
                this.programAmount  = getProgramByID.Response.Amount;
                this.programSessionName  = getProgramByID.Response.SessionName;
                this.programProgramName  = getProgramByID.Response.ProgramName;
                this.Paymentform.SchoolFee = getProgramByID.Response.Amount;
                this.Paymentform.PaymentItem.AmountPaid = getProgramByID.Response.Amount;
                this.ngxService.stopLoader('loader-01');
      },
      error => {

      }
    );
  }

  loadDataFromServerPatial(
    pageIndex: number,
    pageSize: number,
    sortField: string | 'MatricNumber',
    sortOrder: string | 'asc',
    filter: Array<{ key: string; value: string[] }>
  ): void {
    if (pageIndex === 1 || pageIndex === 0){
      pageIndex = 0;
    }else{
      const minus: number = pageIndex - 1;
      pageIndex = minus * pageSize;
    }
    console.log('pageIndex' + ' ' + pageIndex);
    console.log('pageSize' + ' ' + pageSize);
    console.log('sortField' + ' ' + sortField);
    console.log('sortOrder' + ' ' + sortOrder);
    this.loading = true;

    this.calStudents.PartialPaymentsDetail(pageIndex, pageSize, sortField, sortOrder).subscribe(data => {
      this.loading = false;
      const CalStudents: any = data;
      this.totalPatial = CalStudents.tableCount;
      this.listOfDataPatial  = CalStudents.data;
      this.tableCountPatial  = CalStudents.tableCount;
      this.totalCountPatial  = CalStudents.totalCount;
      this.ngxService.stopLoader('loader-02');

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

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | 'MatricNumber',
    sortOrder: string | 'asc',
    filter: Array<{ key: string; value: string[] }>
  ): void {
    if (pageIndex === 1 || pageIndex === 0){
      pageIndex = 0;
    }else{
      const minus: number = pageIndex - 1;
      pageIndex = minus * pageSize;
    }
    console.log('pageIndex' + ' ' + pageIndex);
    console.log('pageSize' + ' ' + pageSize);
    console.log('sortField' + ' ' + sortField);
    console.log('sortOrder' + ' ' + sortOrder);
    this.loading = true;

    this.calStudents.StudentDetail(pageIndex, pageSize, sortField, sortOrder).subscribe(data => {
      this.loading = false;
      const CalStudents: any = data;
      this.total = CalStudents.tableCount;
      this.listOfData  = CalStudents.data;
      this.tableCount  = CalStudents.tableCount;
      this.totalCount  = CalStudents.totalCount;
      this.ngxService.stopLoader('loader-02');

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

  onQueryParamsChangePatial(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'MatricNumber';
    const sortOrder = (currentSort && currentSort.value) || 'asc';
    this.loadDataFromServerPatial(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'MatricNumber';
    const sortOrder = (currentSort && currentSort.value) || 'asc';
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  onSearch(){
    const filter: any = this.search.student;
    this.calStudents.SearchStudent(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, filter).subscribe(data => {
      this.loading = false;
      const CalStudents: any = data;

      this.total = CalStudents.totalCount;
      this.listOfData  = CalStudents.data;
      this.tableCount  = CalStudents.tableCount;
      this.totalCount  = CalStudents.totalCount;
      this.ngxService.stopLoader('loader-02');

    },
    error => {
      this.ngxService.stopLoader('loader-02');
      this.loading = false;
    });

  }

  onSearchCouncle(){
    this.search.student = '';
    this.calStudents.StudentDetail(this.pageIndex, this.pageSize, this.sortField, this.sortOrder).subscribe(data => {
      this.loading = false;
      const CalStudents: any = data;
      console.log(CalStudents.tableCount);
      this.total = CalStudents.tableCount;
      this.listOfData  = CalStudents.data;
      this.tableCount  = CalStudents.tableCount;
      this.totalCount  = CalStudents.totalCount;
      this.ngxService.stopLoader('loader-02');

    },
    error => {
      this.ngxService.stopLoader('loader-02');
      this.loading = false;
    }
    );

  }

  tab(val): void {
    this.rbatchId = val;
    if (this.rbatchId === 'new') {
        this.currenttab = 0;
        this.changetab();
        this.batchNumber = '';
      }

    if (this.rbatchId === 'Partial') {
        this.currenttab = 1;
        this.changetab();
        this.batchNumber = '';
      }

    if (this.rbatchId === 'others') {
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
        this.indextab = 'third-content';
        break;
      }

    }
  }

  swichAccount(val): void{
    if (val === 'new') {
      this.account = 'new';
    } else if (val === 'existing'){
      this.account = 'existing';
    }
  }

  back(): void {
    this.current = 0;
    this.changeContent();
    // this.data[0] = this.form;
  }

  back2(): void {
    this.current2 = 0;
    this.changeContent2();
    // this.data[0] = this.form;
  }

  next(): void {
    this.current += 1;
    this.changeContent();
    // this.data[0] = this.form;
  }

  again(): void{

    this.Paymentform.StudentId =  '';
    this.Paymentform.SessionId = '';
    this.Paymentform.ProgramId = '';
    this.Paymentform.SchoolFee = 0;
    this.Paymentform.Description = '';
    this.Paymentform.CreatedBy = '';
    this.Paymentform.PaymentItem.SlipNo = '';
    this.Paymentform.PaymentItem.AmountPaid = 0;
    this.Paymentform.PaymentItem.DepositorName = '';
    this.Paymentform.PaymentItem.DepositorPhoneNo = '';
    this.Paymentform.PaymentItem.DepositorEmail = '';
    this.Paymentform.PaymentItem.DepositorAddress = '';
    this.Paymentform.PaymentItem.PaymentType = '';
    this.Paymentform.PaymentItem.PaymentMethod = '';
    this.Paymentform.PaymentItem.Description = '';
    this.Paymentform.PaymentItem.CreatedBy = '';
    this.programAmount  = '';
    this.programSessionName  = '';
    this.programProgramName  = '';

    this.form.Title = '';
    this.form.LastName = '';
    this.form.FirstName = '';
    this.form.OtherName = '';
    this.form.Address = '';
    this.form.PhoneNo = '';
    this.form.MatricNumber = '';
    this.form.Email = '';
    this.form.Description = '';
    this.form.CreatedBy = '';
    this.errorFlag = '';
    this.errorMessage = '';
    this.Type = '';
    this.Title = '';
    this.Status = '';
    this.Detail = '';
    this.Instance = '';
    this.current = 0;
    this.changeContent();
    // this.showsDetails = false;
  }

  // open(): void {
  //   this.again();
  //   this.actionBotton = 'create';
  //   this.visible = true;
  // }

  openUpdate(id, payment): void {
    this.again();
    this.actionBotton = 'create';
    this.paymentStatus = payment;
    this.Paymentform.PaymentItem.PaymentType = payment;
    this.ngxService.startLoader('loader-01');
    this.visible = true;
    this.calStudents.getStudentDetail​(id).subscribe(
      data => {
        const getStudentDetail: any = data;
        this.Paymentform.StudentId = id,
        this.form.Id = id;
        this.form.Title = getStudentDetail.Title;
        this.form.LastName = getStudentDetail.LastName;
        this.form.FirstName = getStudentDetail.FirstName;
        this.form.OtherName = getStudentDetail.OtherName;
        this.form.Address = getStudentDetail.Address;
        this.form.PhoneNo = getStudentDetail.PhoneNo;
        this.form.MatricNumber = getStudentDetail.MatricNumber;
        this.form.Email = getStudentDetail.Email;
        this.form.Description = getStudentDetail.Description;
        this.form.CreatedBy = getStudentDetail.CreatedBy;
        this.ngxService.stopLoader('loader-01');
      },
      error => this.handleError(error)
    );
  }

  openUpdate2(Id, payment, action): void {
    this.ngxService.startLoader('loader-01');
    this.paymentId = payment;
    this.paymentStatus = action;
    this.again();
    this.visible = true;

    this.calStudents.getStudentDetail​(Id).subscribe(
      data => {
        const getStudentDetail: any = data;
        this.form.Id = Id;
        this.form.Title = getStudentDetail.Title;
        this.form.LastName = getStudentDetail.LastName;
        this.form.FirstName = getStudentDetail.FirstName;
        this.form.OtherName = getStudentDetail.OtherName;
        this.form.Address = getStudentDetail.Address;
        this.form.PhoneNo = getStudentDetail.PhoneNo;
        this.form.MatricNumber = getStudentDetail.MatricNumber;
        this.form.Email = getStudentDetail.Email;
        this.form.Description = getStudentDetail.Description;
        this.form.CreatedBy = getStudentDetail.CreatedBy;
      },
      error => this.handleError(error)
    );

    this.calStudents.getPaymentDetail​(payment).subscribe(
        (data: any) => {
        const getPaymentDetail: any = data;
        this.getPaymentDetails = data;
        this.getPaymentDetail =  data;
        this.TotalPayments = getPaymentDetail.Request_TotalPayments;
        this.BankCharges = getPaymentDetail.BankCharges;
        this.TotalCharges = getPaymentDetail.TotalCharges;
        this.Paymentform.PaymentItem.RequestId = getPaymentDetail.RequestId;
        this.balancePayload.RequestId = getPaymentDetail.RequestId;
        this.Paymentform.StudentId =  getPaymentDetail.Request_StudentId;
        this.Paymentform.SessionId = getPaymentDetail.Request_SessionId;
        this.Paymentform.ProgramId = getPaymentDetail.Request_ProgramId;
        this.Paymentform.SchoolFee = getPaymentDetail.Request_SchoolFee;
        this.Paymentform.Description = getPaymentDetail.Description;
        this.Paymentform.PaymentItem.SlipNo = '';
        this.Paymentform.PaymentItem.AmountPaid = this.Paymentform.SchoolFee - this.TotalPayments + this.BankCharges;
        // this.balancePayload.AmountPaid = this.Paymentform.SchoolFee - this.TotalPayments + this.BankCharges;
        this.balancePayload.AmountPaid = getPaymentDetail.PaymentBalance;
        this.Paymentform.PaymentItem.DepositorName = '';
        this.Paymentform.PaymentItem.DepositorPhoneNo = '';
        this.Paymentform.PaymentItem.DepositorEmail = '';
        this.Paymentform.PaymentItem.DepositorAddress = '';
        this.Paymentform.PaymentItem.PaymentType = '';
        this.Paymentform.PaymentItem.PaymentMethod = '';
        this.Paymentform.PaymentItem.Description = '';
        this.programAmount  = getPaymentDetail.PaymentBalance;
        this.programSessionName  = getPaymentDetail.Request_SessionName;
        this.programProgramName  = getPaymentDetail.Request_ProgramName;
        this.Paymentform.PaymentItem.PaymentType = getPaymentDetail.PaymentType

        this.calStudents.getProgram(getPaymentDetail.Request_SessionId).subscribe(
          data => {
                    const getProgram: any = data;
                    this.programs  = getProgram.Response;
                    this.ngxService.stopLoader('loader-01');
          },
          error => {
            this.ngxService.stopLoader('loader-01');
          });

      },
      error => this.handleError(error)
    );

  }

  close2(): void {
    this.visible2 = false;
  }

  close(): void {
    this.visible = false;
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
    switch (this.current2) {
      case 0: {
        this.index2 = 'First-content';
        break;
      }
      case 1: {
        this.index2 = 'Second-content';
        break;
      }
      default: {
        this.index2 = 'error';
      }
    }
  }

  onSubmit(): void{
    this.disabled = true;
    this.ngxService.startLoader('loader-01');

    this.Jarwis.getMe().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myEmail =  this.profResponds.email;


        console.log(this.profResponds.email);
        this.Paymentform.PaymentItem.Description = this.Paymentform.Description;
        this.Paymentform.CreatedBy = this.profResponds.email;
        this.Paymentform.PaymentItem.CreatedBy = this.profResponds.email;

        console.log(this.Paymentform);
        this.calStudents.createPayment(this.Paymentform).subscribe(
          data2 => this.handleResponse(data2),
          error => this.handleError(error)
        );
        });
  }



  onBalance(): void{
    this.disabled = true;
    this.ngxService.startLoader('loader-01');

    this.Jarwis.getMe().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myEmail =  this.profResponds.email;


        console.log(this.profResponds.email);
        this.balancePayload.Description = this.balancePayload.Description;
        this.balancePayload.CreatedBy = this.profResponds.email;
        this.balancePayload.PaymentType = 'Balance';


        console.log(this.balancePayload);
        this.calStudents.createBalance(this.balancePayload).subscribe(
          data2 => this.handleResponse(data2),
          error => this.handleError(error)
        );
        });
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
    this.newresponse  = data.response;
    this.ngOnInit();
    this.errorFlag  = data.errorFlag;
    this.errorMessage  = data.errorMessage;
    this.Type  = data.Type;
    this.Title = data.Title;
    this.Status = data.Status;
    this.Detail = data.Detail;
    this.Instance  = data.Instance;

    if (this.Status === 200) {
      this.current += 1;
      this.changeContent();
      this.type = 'success';
      this.notification.create(
        this.type,
        this.errorMessage,
        'Operation successfull'
      );
    }else{
      this.type = 'error';
      this.notification.create(
        this.type,
        this.errorMessage,
        'Operation not successfull'
      );
    }

  }

  handleError(error): void{
    this.disabled = false;
    this.ngxService.stopLoader('loader-01');

    this.newresponse  = error.error.validationErrors;
    this.errorFlag  = error.error.errorFlag;
    this.errorMessage  = error.error.errorMessage;
    console.log(this.errorFlag);
    this.Type  = error.error.Type;
    this.Title = error.error.Title;
    this.Status = error.error.Status;
    this.Detail = error.error.Detail;
    this.Instance  = error.error.Instance;
    this.Detail  = error.error.response;

    if (this.errorFlag === true) {
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
