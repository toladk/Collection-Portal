import { RemitaService } from './../../../Services/RemitaService/remita.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-remita-dashboard',
  templateUrl: './remita-dashboard.component.html',
  styleUrls: ['./remita-dashboard.component.css']
})
export class RemitaDashboardComponent implements OnInit {

  status = 'Pending';
  status2 = 'Approved';
  pageNumber = 0;
  pageSize = 10000;
  orderBy = 'asc';
  rrr = '';

  pendingTransaction = [];
  approvedTransaction = [];

  constructor(
    private remitaService: RemitaService
  ) { }

  ngOnInit(): void {

    this.getPendingTransaction();
    this.getApprovedTransaction();
  }

  getPendingTransaction(){
    this.remitaService.getTransactionByQuery(this.pageNumber, this.pageSize, this.rrr, this.orderBy, this.status).subscribe((result: any) => {
      this.pendingTransaction = result.transactions;
    });
  }

  getApprovedTransaction(){
    this.remitaService.getTransactionByQuery(this.pageNumber, this.pageSize, this.rrr, this.orderBy, this.status2).subscribe((result: any) => {
      this.approvedTransaction = result.transactions;
    });
  }

}
