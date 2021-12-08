import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  appName: any;
  profResponds: any;
  uName: any;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private ngxService: NgxUiLoaderService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ngxService.startLoader('loader-01');
    this.reload();
    this.getUserDetails();

    this.actRoute.paramMap.subscribe((params => {
      let val = params.get('id');
      this.appName = val;
      this.Token.handle2(val);
    }));
  }

  getUserDetails(){
    this.Jarwis.getMe().subscribe(
      data => {
        this.profResponds = data;
        this.uName = this.profResponds.username;
        this.ngxService.stopLoader('loader-01');
    });
  }

  refreshPage(){
    this._document.defaultView.location.reload();
  }

  reload(){
    if (localStorage.getItem('reload') == 'true') {

    } else {
      window.location.reload();
      localStorage.setItem('reload', 'true')
    }

  }

}
