import { Component, Injectable, OnInit } from '@angular/core';
import { CalpayStudentService } from 'src/app/Services/CalpayServices/calpay-student.service';
import { InfinitypayServicesService } from 'src/app/Services/InfinitypayServices/infinitypay-services.service';
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
  selector: 'app-infinity-all-transactions',
  templateUrl: './infinity-all-transactions.component.html',
  styleUrls: ['./infinity-all-transactions.component.css']
})
export class InfinityAllTransactionsComponent implements OnInit {

    listOfData: any;
    Pendingtransactions: any;
    totalPendingtransactions: any;
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


    public search = {
      student: '',
    };

    public dateSearch = {
      DateFrom: '',
      DateTo: '',
    };

    public validate = {
      transref: '',
    }
    constructor(
      private http: HttpClient,
      private msg: NzMessageService,
      private router: Router,
      private actRoute: ActivatedRoute,
      private calStudents: CalpayStudentService,
      private infinity: InfinitypayServicesService,
      private ngxService: NgxUiLoaderService,
      private nzMessageService: NzMessageService,
      private notification: NzNotificationService,
      private modal: NzModalService,
      private Jarwis: JarwisService,
    ) { }

    ngOnInit(): void {

      // this.ngxService.startLoader('loader-03');
      // this.ngxService.startLoader('loader-02');

      this.infinity.getpendingtransaction('2020-01-03', '2021-3-03').subscribe(
        data => {
                  const getpendingtransaction: any = data;
                  this.Pendingtransactions  = getpendingtransaction.value;
                  this.totalPendingtransactions = this.Pendingtransactions.length;

                  console.log(this.Pendingtransactions);
                  console.log(this.totalPendingtransactions);
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
                  this.listOfData  = getconfirmtransaction.value;
                  this.total = this.listOfData.length;
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

    console.log(this.dateSearch);

    const dateFrom: any =this.dateSearch.DateFrom;
    const DateTo: any =this.dateSearch.DateTo;
    this.ngxService.startLoader('loader-03');

    this.infinity.getpendingtransaction(dateFrom, DateTo).subscribe(
      data => {
                this.loading = false;
                const getpendingtransaction: any = data;
                this.Pendingtransactions  = getpendingtransaction.value;
                this.totalPendingtransactions = this.Pendingtransactions.length;
                this.ngxService.stopLoader('loader-03');
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
                  this.ngxService.stopLoader('loader-02');
                  this.loading = false;
                  const getconfirmtransaction: any = data;
                  this.listOfData  = getconfirmtransaction.value;
                  this.total = this.listOfData.length;
        },
        error => {
          this.ngxService.stopLoader('loader-02');
        }
      );
      }
  }

