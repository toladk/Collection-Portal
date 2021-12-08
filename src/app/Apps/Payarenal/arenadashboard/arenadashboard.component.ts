import { PayarenaendpointsService } from './../../../Services/PayarenalServices/payarenaendpoints.service';
import { PayarenaModel } from './../model/payarenamodel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arenadashboard',
  templateUrl: './arenadashboard.component.html',
  styleUrls: ['./arenadashboard.component.css']
})
export class ArenadashboardComponent implements OnInit {

  constructor(
    private payarenaService: PayarenaendpointsService
  ) { }

  ngOnInit(): void {
  }



}
