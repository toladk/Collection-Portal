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
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.css']
})
export class ViewPaymentsComponent implements OnInit {

  listOfData: any;
  visible = false;
  account = 'new';
  disabled = false;

  public deleteStudent = {
    Id: null,
    DeleteKey: ''
  };

  config: ExportAsConfig;

  // exportAsConfig: ExportAsConfig = {
  //   type: 'xlsx',
  //   elementId: 'myTableElementId',
  // };

  // exportAsConfigCSV: ExportAsConfig = {
  //   type: 'csv',
  //   elementId: 'myTableElementId'
  // };

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

  index = 'First-content';
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
  view = 'list';
  getPaymentDetail: any;
  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private calStudents: CalpayStudentService,
    private ngxService: NgxUiLoaderService,
    // private exportAsService: ExportAsService,
    private nzMessageService: NzMessageService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private Jarwis: JarwisService,
  ) { }

  ngOnInit(): void {

    this.ngxService.startLoader('loader-02');
    this.loadDataFromServer(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, []);

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

    this.calStudents.ApprovedPaymentsDetail(pageIndex, pageSize, sortField, sortOrder).subscribe(data => {
      this.loading = false;
      const CalStudents: any = data;
      this.total = CalStudents.tableCount;
      this.listOfData  = CalStudents.data;
      this.tableCount  = CalStudents.tableCount;
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
    this.calStudents.ApprovedPaymentsDetail(this.pageIndex, this.pageSize, this.sortField, this.sortOrder).subscribe(data => {
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

  invoice(payment){
    this.view = 'invoice';
    this.ngxService.startLoader('loader-04');
    this.calStudents.getPaymentDetail​(payment).subscribe(
      (data: any) => {
      const getPaymentDetail: any = data;
      this.getPaymentDetail =  getPaymentDetail;
      this.programSessionName  = getPaymentDetail.Request_SessionName;
      this.programProgramName  = getPaymentDetail.Request_ProgramName;
      this.paymentStatus = getPaymentDetail.PaymentType;
      this.ngxService.stopLoader('loader-04');
    },
    error => {
      this.ngxService.stopLoader('loader-04');
    }
  );
  }

  close(){
    this.view = 'list';
  }


  printComponent() {
    const divToPrint = document.getElementById('myTableElementId');
    let style = '<style>';
    style = style + '.text-default-d3 { align-content: center; }';
    style = style + 'img { align-content: center; }';
    style = style + '.text-secondary-d1 {color: #728299!important; }';
    style = style + '.page-header {margin: 0 0 1rem; padding-bottom: 1rem; padding-top: .5rem; border-bottom: 1px dotted #e2e2e2; display: -ms-flexbox; display: flex; -ms-flex-pack: justify; justify-content: space-between; -ms-flex-align: center; align-items: center; }';
    style = style + '.page-title { padding: 0; margin: 0; font-size: 1.75rem; font-weight: 300; }';
    style = style + '.brc-default-l1 {border-color: #dce9f0!important;}';
    style = style + '.ml-n1, .mx-n1 { margin-left: -.25rem!important; }';
    style = style + '.mr-n1, .mx-n1 {margin-right: -.25rem!important; }';
    style = style + '.mb-4, .my-4 { margin-bottom: 1.5rem!important; }';
    style = style + 'hr { margin-top: 1rem; margin-bottom: 1rem; border: 0; border-top: 1px solid rgba(0,0,0,.1); }';
    style = style + '.text-grey-m2 { color: #888a8d!important; }';
    style = style + '.text-95 .text-grey-m2 {  float: right; color: #888a8d!important; }';
    style = style + '.text-success-m2 { color: #86bd68!important; }';
    style = style + '.font-bolder, .text-600 {font-weight: 600!important; }';
    style = style + '.text-110 {font-size: 110%!important;}';
    style = style + '.text-blue {color: #1CAA3D!important;}';
    style = style + '.pb-25, .py-25 {padding-bottom: .75rem!important; }';
    style = style + '.pt-25, .py-25 { padding-top: .75rem!important; }';
    style = style + '.bgc-default-tp1 { background-color: rgba(28,170,61)!important;}';
    style = style + '.bgc-default-l4, .bgc-h-default-l4:hover { background-color: #f3f8fa!important;}';
    style = style + '.page-header .page-tools { -ms-flex-item-align: end; align-self: flex-end; }';
    style = style + '.btn-light {color: #757984; background-color: #f5f6f9; border-color: #dddfe4;}';
    style = style + '.w-2 { width: 1rem; }';
    style = style + '.text-120 { font-size: 120%!important;}';
    style = style + '.text-primary-m1 {  color: #1CAA3D!important;}';
    style = style + '.text-danger-m1 { color: #dd4949!important; }';
    style = style + '.text-blue-m2 {color: #1CAA3D!important;}';
    style = style + '.text-150 { font-size: 150%!important;}';
    style = style + '.text-60 { font-size: 60%!important; }';
    style = style + '.text-grey-m1 { color: #7b7d81!important; }';
    style = style + '.align-bottom { vertical-align: bottom!important;}';
    style = style + '</style>';

    const win = window.open('', '', 'height=700,width=700');
    win.document.write(style);          //  add the style.
    win.document.write(divToPrint.outerHTML);
    win.document.close();
    win.print();

    }

    openPDF():void {
      let DATA = document.getElementById('myTableElementId');

      html2canvas(DATA).then(canvas => {

          let fileWidth = 208;
          let fileHeight = canvas.height * fileWidth / canvas.width;

          const FILEURI = canvas.toDataURL('image/png')
          let PDF = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

          PDF.save('Invoice.pdf');
      });
    }

// exportAsXLSX(){
//   this.exportAsService.save(this.exportAsConfig, 'Invoice').subscribe(() => {

//   });

//   this.exportAsService.get(this.config).subscribe(content => {
//     console.log(content);
//   });
//   }
//   exportAsCSV(){
//     this.exportAsService.save(this.exportAsConfigCSV, 'Print Invoice').subscribe(() => {

//     });
//     this.exportAsService.get(this.config).subscribe(content => {
//       console.log(content);
//     });
//   }

}
