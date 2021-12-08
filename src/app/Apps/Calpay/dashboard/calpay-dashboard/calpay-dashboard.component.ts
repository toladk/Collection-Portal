import { Component, Injectable, OnInit } from '@angular/core';
import { CalpayStudentService } from 'src/app/Services/CalpayServices/calpay-student.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { CalpayModel } from './../../model/calpaymodel';
import {ReversePipe} from 'ngx-pipes';


@Component({
  selector: 'app-calpay-dashboard',
  templateUrl: './calpay-dashboard.component.html',
  styleUrls: ['./calpay-dashboard.component.css'],
  providers: [ReversePipe]
})
export class CalpayDashboardComponent implements OnInit {
  allStudentCount: any;
  allPaymentsCount: any;
  allPendingPayments: any;
  allApprovedPayments: any;
  allFullPayments: any;
  allPartialPayments: any;
  allPendingcount: any;
  allApprovedcount: any;
  allFullcount: any;
  allPartialcount: any;
  allPaymentsAmount: any;
  allPaymentSum: any[];
  allPendingPayment: any[];
  allApprovedPayment: any[];
  allPartialsum: any[];
  allRejectedPayments: any;
  allRejectedcount: any;
  allRejectedsum: any[];



  constructor(
    private actRoute: ActivatedRoute,
    private calStudents: CalpayStudentService,
    private ngxService: NgxUiLoaderService,
    private Jarwis: JarwisService,
    private reversePipe: ReversePipe
  ) {
    this.reversePipe.transform('foo');
  }

  ngOnInit(): void {

    this.calStudents.StudentDetail2().subscribe(
      data => { const StudentDetail2: any = data;
                this.allStudentCount = StudentDetail2.length;

      },
      error => {
        this.allStudentCount = 0;
      }
    );


    this.calStudents.allPayments().subscribe(

      data => {
                const AllArray = [];
                const ApprovedArray = [];
                const PartialArray = [];
                const PendingArray = [];
                const RejectedArray = [];
                const allPayments : any = data;
                this.allPaymentsCount = allPayments.length;
                this.allPaymentsAmount = allPayments;

                this.allPaymentsAmount.forEach(element => {
                  AllArray.push(element.AmountPaid);
                  });
                this.allPaymentSum = AllArray;


                this.allPendingPayments = allPayments.filter(component => {
                  return component.Status === 'Pending';
                });
                this.allPendingcount = this.allPendingPayments.length;
                this.allPendingPayments.forEach(element => {
                  PendingArray.push(element.AmountPaid);
                  });
                this.allPendingPayment = PendingArray;


                this.allApprovedPayments = allPayments.filter(component => {
                  return component.Status === 'Approved';
                });
                this.allApprovedcount = this.allApprovedPayments.length;
                this.allApprovedPayments.forEach(element => {
                  ApprovedArray.push(element.AmountPaid);
                  });
                this.allApprovedPayment = ApprovedArray;


                this.allFullPayments = allPayments.filter(component => {
                  return component.PaymentType === 'Full';
                });
                this.allFullcount = this.allFullPayments.length;

                this.allPartialPayments = allPayments.filter(component => {
                  return component.PaymentType === 'Partial';
                });
                this.allPartialcount = this.allPartialPayments.length;
                this.allPartialPayments.forEach(element => {
                  PartialArray.push(element.AmountPaid);
                  });
                this.allPartialsum = PartialArray;

                this.allRejectedPayments = allPayments.filter(component => {
                  return component.PaymentType === 'Reject';
                });
                this.allRejectedcount = this.allRejectedPayments.length;
                this.allRejectedPayments.forEach(element => {
                  RejectedArray.push(element.AmountPaid);
                  });
                this.allRejectedsum = RejectedArray;

      },
      error => {
        this.allPaymentsCount = 0;
      }
    );

  }


}
