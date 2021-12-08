import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-general-dashboard',
  templateUrl: './general-dashboard.component.html',
  styleUrls: ['./general-dashboard.component.css']
})
export class GeneralDashboardComponent implements OnInit {

  app: string;
  profResponds: any;
  me: any;
  myId: any;
  roles: any;
  uName: any;

  constructor(
              private Jarwis: JarwisService,
              private Token: TokenService,
              private Navbar: NavbarComponent,
              private router: Router,
              private Auth: AuthService,
              private actRoute: ActivatedRoute,
              private ngxService: NgxUiLoaderService
        ) { }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor(( new Date).getTime() / 1000)) >= expiry;
  }

  ngOnInit(): void {
    this.Token.handle2('none');
    this.app = this.Token.get2();

    this.ngxService.start();

    this.Jarwis.getMe().subscribe(
      data => {
        this.ngxService.stop();
        this.profResponds = data;
        this.me = this.profResponds;
        this.uName = this.profResponds.username;
        this.roles = this.me.roles;
      },
      error => {
        this.ngxService.stop();
      }
    );

    const token = localStorage.getItem('token');

    if (this.tokenExpired(token)){
      this.logout();
    }
  }

  logout() {
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    this.Token.removeUser();
    localStorage.removeItem('reload');
    this.router.navigateByUrl('/login');
  }

  OnRoute(val, id): void{
    this.Navbar.OnRoute2(val, id);
  }

}
