import { Component, OnInit } from '@angular/core';
import { AgisService } from './../../../Services/AgisService/agis.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AgisModel } from './../model/agismodel';

@Component({
  selector: 'app-agisreport',
  templateUrl: './agisreport.component.html',
  styleUrls: ['./agisreport.component.css']
})
export class AgisreportComponent implements OnInit {

  allApprovedTransactionList: AgisModel[] = [];
  usernameResult = [];
  permissionList = [];

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

  downloadData(){
    this.agisService.exportAsExcelFile(this.allApprovedTransactionList, 'Transactions');
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
