import { Component, OnInit } from '@angular/core';
import { AgisService } from './../../../Services/AgisService/agis.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AgisModel } from './../model/agismodel';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-agisreceipts',
  templateUrl: './agisreceipts.component.html',
  styleUrls: ['./agisreceipts.component.css']
})
export class AgisreceiptsComponent implements OnInit {

  allApprovedTransactionList: AgisModel[] = [];
  transactionById: any;

  showBasedOnPerm = false;
  usernameResult = [];
  permissionList = [];

  //Drawer
  drawerOpen = false;

  // for buttons
  size: NzButtonSize = 'small';

  // For Tabs
  indextab = 'First-content';
  index = 'First-content';
  rbatchId: any;
  currenttab = 0;
  batchNumber: any;
  current =  0;

  constructor(
    private agisService: AgisService,
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getApprovedTransactions();
    this.getUserByUsername();
  }

  open(): void {
    this.drawerOpen = true;
  }
  close(){
    this.drawerOpen = false;
  }

  // For tab changes
  tab(val): void {
    this.rbatchId = val;
    if (this.rbatchId === 'firstTab') {
        this.currenttab = 0;
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

    }
  }

  // Get Approved Transactions
  getApprovedTransactions(){
    this.agisService.approvedTransactions().subscribe((result: any) => {
      this.allApprovedTransactionList = result.value;
    })
  }

  viewReceipt(id){
    this.drawerOpen = true;
    this.agisService.getTransactionsById(id).subscribe((result: any) => {
      this.transactionById = result.value;
      console.log('checking trans', this.transactionById);
    })
  }

  openPDF():void {
    let DATA = document.getElementById('PrintFile');

    html2canvas(DATA).then(canvas => {

        let fileWidth = 200;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

        PDF.save('Invoice.pdf');
    });
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

}
