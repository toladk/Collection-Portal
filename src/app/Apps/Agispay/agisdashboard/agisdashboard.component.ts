import { Component, OnInit } from '@angular/core';
import { AgisModel } from './../model/agismodel';
import { AgisService } from './../../../Services/AgisService/agis.service';

@Component({
  selector: 'app-agisdashboard',
  templateUrl: './agisdashboard.component.html',
  styleUrls: ['./agisdashboard.component.css']
})
export class AgisdashboardComponent implements OnInit {

  allPendingTransactionList: AgisModel[] = [];
  allTransactionList: AgisModel[] = [];
  allFailedTransactionList: AgisModel[] = [];
  allApprovedTransactionList: AgisModel[] = [];
  allRejectedTransactionList: AgisModel[] = [];

  constructor(
    private agisService: AgisService,
  ) { }

  ngOnInit(): void {
    this.getPendingTransactions();
    this.getAllTransactions();
    this.getApprovedTransactions();
    this.getFailedTransactions();
    this.getRejectedTransactions();
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
    this.agisService.failedTransactions().subscribe((result: any) => {
      this.allFailedTransactionList = result.value;
    })
  }

  getRejectedTransactions(){
    this.agisService.getRejectedTransactions().subscribe((result: any) => {
      this.allRejectedTransactionList = result.value;
    })
  }

}
