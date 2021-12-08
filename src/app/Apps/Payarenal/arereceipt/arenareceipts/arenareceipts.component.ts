import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayarenaendpointsService } from './../../../../Services/PayarenalServices/payarenaendpoints.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PayarenaModel } from './../../model/payarenamodel';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-arenareceipts',
  templateUrl: './arenareceipts.component.html',
  styleUrls: ['./arenareceipts.component.css']
})
export class ArenareceiptsComponent implements OnInit {
  isShown: boolean = false ;
  isShown2: boolean = false ;

  allTransactionList: PayarenaModel[] = [];
  transactionById: any;

  receiptTransForm: FormGroup;

  // drawer
  drawerOpen = false;

  // for searching
  searchValue: string;

  // for buttons
  size: NzButtonSize = 'small';

  // for butting withl loader
  isLoadingTwo = false;

  // Pagination
  pagination: number = 1;

  // For Tabs
  indextab = 'First-content';
  index = 'First-content';
  rbatchId: any;
  currenttab = 0;
  batchNumber: any;
  current =  0;

  // for field
  bindApproved = 'Approved';

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private payArenaService: PayarenaendpointsService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.receiptTransForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      tranStatus: ['', Validators.required],
    });
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

  // Sorting
  key: string = 'id';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  // Get All Transactions
  getAllTransactions(){
    this.isShown = ! this.isShown;
    this.isShown2 = ! this.isShown2;
    this.payArenaService.getAllTransactions( this.receiptTransForm.value.tranStatus, this.receiptTransForm.value.fromDate, this.receiptTransForm.value.toDate ).subscribe((result: any) => {
      this.allTransactionList = result.value;
      if(result.isSuccess === true){
        this.isShown = this.isShown;
        this.notification.success( 'Transactions', 'Transactions Loaded Sucessfully!!' )
      }
      this.isShown = ! this.isShown;
    },error => {
      this.notification.error('Transactions', error.error)
    })
  }

  getTransactionById(id){
    this.drawerOpen = true;
    this.payArenaService.getTransactionById(id).subscribe((result: any) => {
      this.transactionById = result.value;
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


}
