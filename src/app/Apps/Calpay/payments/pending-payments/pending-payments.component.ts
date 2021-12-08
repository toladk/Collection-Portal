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
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

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
  selector: 'app-pending-payments',
  templateUrl: './pending-payments.component.html',
  styleUrls: ['./pending-payments.component.css']
})
export class PendingPaymentsComponent implements OnInit {

  listOfData: any;
  visible = false;
  account = 'new';
  disabled = false;
  includes: any;
  ViewVisible = false;
  placement: NzDrawerPlacement = 'right';

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

  public deletepayment = {
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

  public Approvepayment = {
    PaymentLineItemId: null,
    ApprovedBy: null,
    IsApproved: true,
    Reason: 'string'
  };

  public Paymentform = {
    Id: '',
    StudentId: '',
    SessionId: '',
    ProgramId: '',
    SchoolFee: '',
    Description: '',
    UpdatedBy: '',
    PaymentItem: {
      Id: '',
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
      UpdatedBy: ''
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
  getPaymentDetail: CalpayModel;
  getPaymentDetails: any;
  paymentId: any;
  roles: any;
  permissions: any[];
  role: any;
  Message: any;
  TotalPayments: any;
  TotalCharges: any;
  programCharges: any;
  swapId: any;
  swapRequestId: any;
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

    this.calStudents.getSessions().subscribe(
      data => {
                const getSessions: any = data;
                this.sessions  = getSessions.Response;
      },
      error => {

      }
    );

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

    this.calStudents.PaymentsDetail(pageIndex, pageSize, sortField, sortOrder).subscribe(data => {
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
    this.calStudents.SearchPayments(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, filter).subscribe(data => {
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
    this.calStudents.PaymentsDetail(this.pageIndex, this.pageSize, this.sortField, this.sortOrder).subscribe(data => {
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

  viewOpen(payment: string): void {
    this.ViewVisible = true;
    this.preview(payment);
  }

  viewClose(): void {
    this.ViewVisible = false;
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
    this.Paymentform.SchoolFee = '';
    this.Paymentform.Description = '';
    this.Paymentform.UpdatedBy = '';
    this.Paymentform.PaymentItem.SlipNo = '';
    this.Paymentform.PaymentItem.AmountPaid = '';
    this.Paymentform.PaymentItem.DepositorName = '';
    this.Paymentform.PaymentItem.DepositorPhoneNo = '';
    this.Paymentform.PaymentItem.DepositorEmail = '';
    this.Paymentform.PaymentItem.DepositorAddress = '';
    this.Paymentform.PaymentItem.PaymentType = '';
    this.Paymentform.PaymentItem.PaymentMethod = '';
    this.Paymentform.PaymentItem.Description = '';
    this.Paymentform.PaymentItem.UpdatedBy = '';


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
    this.current2 = 0;
    this.changeContent2();

    this.Approvepayment.PaymentLineItemId = '';
    this.Approvepayment.ApprovedBy = '';
    this.Approvepayment.Reason = '';
  }

  // open(): void {
  //   this.again();
  //   this.actionBotton = 'create';
  //   this.visible = true;
  // }

  preview(payment){
    this.again();
    this.ngxService.startLoader('loader-03');
    this.calStudents.getPaymentDetail​(payment).subscribe(
      (data: any) => {
        const getPaymentDetail: any = data;
        this.getPaymentDetails = data;
        this.getPaymentDetail =  data;
        this.TotalPayments = getPaymentDetail.Request_TotalPayments;
        this.TotalCharges = getPaymentDetail.TotalCharges;
        this.Paymentform.PaymentItem.RequestId = getPaymentDetail.RequestId;
        this.Paymentform.StudentId =  getPaymentDetail.Request_StudentId;
        this.Paymentform.SessionId = getPaymentDetail.Request_SessionId;
        this.Paymentform.ProgramId = getPaymentDetail.Request_ProgramId;
        this.Paymentform.SchoolFee = getPaymentDetail.Request_SchoolFee;
        this.Paymentform.Description = getPaymentDetail.Description;
        this.Paymentform.PaymentItem.SlipNo = getPaymentDetail.SlipNo;
        this.Paymentform.PaymentItem.DepositorName = getPaymentDetail.DepositorName;
        this.Paymentform.PaymentItem.DepositorPhoneNo = getPaymentDetail.DepositorPhoneNo;
        this.Paymentform.PaymentItem.DepositorEmail = getPaymentDetail.DepositorEmail;
        this.Paymentform.PaymentItem.DepositorAddress = getPaymentDetail.DepositorAddress;
        this.Paymentform.PaymentItem.PaymentType = getPaymentDetail.PaymentType;
        this.Paymentform.PaymentItem.PaymentMethod = getPaymentDetail.PaymentMethod;
        this.Paymentform.PaymentItem.Description = getPaymentDetail.Description;
        this.programAmount  = getPaymentDetail.Request_SchoolFee;
        this.programSessionName  = getPaymentDetail.Request_SessionName;
        this.programProgramName  = getPaymentDetail.Request_ProgramName;
        this.Paymentform.PaymentItem.PaymentType = getPaymentDetail.PaymentType;
        this.Approvepayment.IsApproved = true;

        this.ngxService.stopLoader('loader-03');
    },
    error => {
      this.ngxService.stopLoader('loader-03');
    }
  );
  }

  openUpdate(id, payment): void {
    this.again();
    this.actionBotton = 'create';
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

    this.calStudents.getPaymentDetail​(payment).subscribe(
      data => {
        const getPaymentDetail: any = data;
        this.Paymentform.Id =  getPaymentDetail.Id;
        this.Paymentform.PaymentItem.RequestId = getPaymentDetail.RequestId;
        this.Paymentform.PaymentItem.Id = getPaymentDetail.Id;
        this.Paymentform.StudentId =  getPaymentDetail.Request_StudentId;
        this.Paymentform.SessionId = getPaymentDetail.Request_SessionId;
        this.Paymentform.ProgramId = getPaymentDetail.Request_ProgramId;
        this.Paymentform.SchoolFee = getPaymentDetail.Request_SchoolFee;
        this.Paymentform.Description = getPaymentDetail.Description;
        this.Paymentform.UpdatedBy = getPaymentDetail.CreatedBy;
        this.Paymentform.PaymentItem.SlipNo = getPaymentDetail.SlipNo;
        this.Paymentform.PaymentItem.AmountPaid = getPaymentDetail.AmountPaid;
        this.Paymentform.PaymentItem.DepositorName = getPaymentDetail.DepositorName;
        this.Paymentform.PaymentItem.DepositorPhoneNo = getPaymentDetail.DepositorPhoneNo;
        this.Paymentform.PaymentItem.DepositorEmail = getPaymentDetail.DepositorEmail;
        this.Paymentform.PaymentItem.DepositorAddress = getPaymentDetail.DepositorAddress;
        this.Paymentform.PaymentItem.PaymentType = getPaymentDetail.PaymentType;
        this.Paymentform.PaymentItem.PaymentMethod = getPaymentDetail.PaymentMethod;
        this.Paymentform.PaymentItem.Description = getPaymentDetail.Description;
        this.Paymentform.PaymentItem.UpdatedBy = getPaymentDetail.CreatedBy;
        this.programAmount  = getPaymentDetail.Request_SchoolFee;
        this.programSessionName  = getPaymentDetail.Request_SessionName;
        this.programProgramName  = getPaymentDetail.Request_ProgramName;
        this.paymentStatus = getPaymentDetail.PaymentType;
        this.Paymentform.PaymentItem.PaymentType = getPaymentDetail.PaymentType;
        this.Approvepayment.IsApproved = true;

        this.swapId = getPaymentDetail.RequestId;
        this.swapRequestId = getPaymentDetail.Id;

        this.calStudents.getProgram(getPaymentDetail.Request_SessionId).subscribe(
            data => {
                      const getProgram: any = data;
                      this.programs  = getProgram.Response;
                      this.ngxService.stopLoader('loader-01');
            },
            error => {
              this.ngxService.stopLoader('loader-01');
            }
        );
      },
      error => this.handleError(error)
    );
  }

  warning(Id, payment, action): void {
    this.ngxService.startLoader('loader-01');
    this.again();
    this.paymentId = payment;
    this.visible2 = true;
    this.actionBotton = action;
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
        this.ngxService.stopLoader('loader-01');
      },
      error => this.handleError(error)
    );

    this.calStudents.getPaymentDetail​(payment).subscribe(
        (data: any) => {
        const getPaymentDetail: any = data;
        this.getPaymentDetails = data;
        this.getPaymentDetail =  data;
        this.Paymentform.Id =  getPaymentDetail.Id;
        this.Paymentform.PaymentItem.RequestId = getPaymentDetail.RequestId;
        this.Paymentform.PaymentItem.Id = getPaymentDetail.Id;
        this.Paymentform.StudentId =  getPaymentDetail.Request_StudentId;
        this.Paymentform.SessionId = getPaymentDetail.Request_SessionId;
        this.Paymentform.ProgramId = getPaymentDetail.Request_ProgramId;
        this.Paymentform.SchoolFee = getPaymentDetail.Request_SchoolFee;
        this.Paymentform.Description = getPaymentDetail.Description;
        this.Paymentform.UpdatedBy = getPaymentDetail.CreatedBy;
        this.Paymentform.PaymentItem.SlipNo = getPaymentDetail.SlipNo;
        this.Paymentform.PaymentItem.AmountPaid = getPaymentDetail.AmountPaid;
        this.Paymentform.PaymentItem.DepositorName = getPaymentDetail.DepositorName;
        this.Paymentform.PaymentItem.DepositorPhoneNo = getPaymentDetail.DepositorPhoneNo;
        this.Paymentform.PaymentItem.DepositorEmail = getPaymentDetail.DepositorEmail;
        this.Paymentform.PaymentItem.DepositorAddress = getPaymentDetail.DepositorAddress;
        this.Paymentform.PaymentItem.PaymentType = getPaymentDetail.PaymentType;
        this.Paymentform.PaymentItem.PaymentMethod = getPaymentDetail.PaymentMethod;
        this.Paymentform.PaymentItem.Description = getPaymentDetail.Description;
        this.Paymentform.PaymentItem.UpdatedBy = getPaymentDetail.CreatedBy;
        this.programAmount  = getPaymentDetail.Request_SchoolFee;
        this.programSessionName  = getPaymentDetail.Request_SessionName;
        this.programProgramName  = getPaymentDetail.Request_ProgramName;
        this.paymentStatus = getPaymentDetail.PaymentType;
        this.Paymentform.PaymentItem.PaymentType = getPaymentDetail.PaymentType;
        this.Approvepayment.IsApproved = true;
      },
      error => this.handleError(error)
    );

  }

  close2(): void {
    this.visible2 = false;
    this.again();
  }

  close(): void {
    this.visible = false;
    this.again();
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
    // this.Paymentform.PaymentItem.RequestId = this.swapRequestId;
    // this.Paymentform.PaymentItem.Id = this.swapId;
    this.Paymentform.Id = this.swapId;
    console.log('checking request', this.swapId);
    console.log('checking id', this.swapId);
    this.disabled = true;
    this.ngxService.startLoader('loader-01');

    this.Jarwis.getMe().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myEmail =  this.profResponds.email;

        this.Paymentform.PaymentItem.Description = this.Paymentform.Description;
        this.Paymentform.UpdatedBy = this.profResponds.email;
        this.Paymentform.PaymentItem.UpdatedBy = this.profResponds.email;

        this.calStudents.UpdatePayment(this.Paymentform).subscribe(
          data2 => this.handleResponse(data2),
          error => this.handleError(error)
        );
        });
  }

  ondelete(){
    this.disabled = true;
    this.ngxService.startLoader('loader-01');

    this.deletepayment.Id = this.paymentId;
    this.deletepayment.DeleteKey = this.Approvepayment.Reason;

    console.log(this.deletepayment);

    this.calStudents.DeletePayment(this.deletepayment).subscribe(
          data => {

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
                  this.current2 = 1;
                  this.changeContent2();
                  this.type = 'success';
                  this.notification.create(
                    this.type,
                    'Operation successfull',
                    this.newresponse
                  );
                }else{
                  this.type = 'error';
                  this.notification.create(
                    this.type,
                    this.errorMessage,
                    this.newresponse
                  );
                }
          },
          error => {
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
              this.current = 1;
              this.changeContent2();
              this.type = 'error';
              this.notification.create(
                this.type,
                this.Title,
                this.Detail
              );
    }
          }
        );
  }

  onAction(t, e): void{
    if(t === 'approve'){
      this.Approvepayment.IsApproved = true;
    }else{
      this.Approvepayment.IsApproved = false;
    }
    console.log(this.Approvepayment);
  }

  onapprove(){
    this.disabled = true;
    this.ngxService.startLoader('loader-01');
    this.Jarwis.getMe().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myEmail =  this.profResponds.email;


        this.Approvepayment.PaymentLineItemId = this.paymentId;
        this.Approvepayment.ApprovedBy =  this.myEmail;

        this.calStudents.ApprovePayment(this.Approvepayment).subscribe(
          data => {

                this.disabled = false;
                this.ngxService.stopLoader('loader-01');
                this.newresponse  = data.response;

                this.errorFlag  = data.errorFlag;
                this.errorMessage  = data.message;
                this.Type  = data.Type;
                this.Title = data.Title;
                this.Status = data.Status;
                this.Detail = data.Detail;
                this.Instance  = data.Instance;
                this.ngOnInit();

                if (!this.errorFlag) {
                  this.current2 = 1;
                  this.changeContent2();
                  this.type = 'success';
                  this.notification.create(
                    this.type,
                    'Operation successfull',
                    this.errorMessage
                  );
                }else{
                  this.current2 = 1;
                  this.changeContent2();
                  this.type = 'error';
                  this.notification.create(
                    this.type,
                    'Operation Failed',
                    this.errorMessage
                  );
                }
          },
          error => {
            this.disabled = false;
            this.ngxService.stopLoader('loader-01');
            this.errorFlag  = error.error.errorFlag;
            this.errorMessage  = error.error.Detail;
            this.newresponse  = error.error.validationErrors;
            this.Type  = error.error.Type;
            this.Title = error.error.Title;
            this.Status = error.error.Status;

            if (error.error.validationErrors == null) {
              this.errorMessage  = error.error.message;
            }

            this.current2 = 1;
            this.changeContent2();
            this.type = 'error';
            this.notification.create(
                this.type,
                'Operation Failed',
                this.errorMessage
              );
          }
        );
    });

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
