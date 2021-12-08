import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { myMenu } from './navbarMenu';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { exit } from 'process';
import { NgxUiLoaderService } from 'ngx-ui-loader';

declare let $: any;
declare let swal: any;
declare let toastr: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;
  app: string;
  menuData = [];
  permissions = [];
  profResponds: any;
  me: any;
  myId: any;
  roles: any;
  id: any;
  val: any;

  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService,
    private getData: myMenu,
    private Jarwis: JarwisService,
    private ngxService: NgxUiLoaderService,
  ) { }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor(( new Date).getTime() / 1000)) >= expiry;
  }

  ngOnInit(): void {
    this.ngxService.startLoader('loader-01');

    this.Auth.authStatus.subscribe(Value => this.loggedIn = Value);
    this.app = this.Token.get2();

    this.menuData = this.getData.getMenu(this.app);

    this.Jarwis.getMe().subscribe(
      data => {
        this.ngxService.stopLoader('loader-01');
        this.profResponds = data;
        this.me = this.profResponds;
        this.myId = this.me.emp_id;
      }
    );
    const token = localStorage.getItem('token');

    if (this.tokenExpired(token)){
      this.Auth.changeAuthStatus(false);
      this.Token.remove();
      this.Token.removeUser();
      localStorage.removeItem('reload');
      this.router.navigateByUrl('/login');
    }

    $('#item_search').on('keyup', function() {
      const value = $(this).val().toLowerCase();
      $('#item div').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }

  logout( Event: MouseEvent) {
    Event.preventDefault();
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    this.Token.removeUser();
    localStorage.removeItem('reload');
    this.router.navigateByUrl('/login');
  }

  OnRoute(val): void{

    this.app = val;
    this.Token.handle2(val);
    this.router.navigateByUrl('/my-apps');
    localStorage.removeItem('reload');
  }

  OnRoute2(val, id): void{
    const permissionArray = [];
    this.app = val;
    this.Token.handle2(val);
    localStorage.setItem('pnum', id);

    this.menuData = this.getData.getMenu(this.app);

    this.Jarwis.getMe().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        console.log(this.me);
        this.roles = this.me.roles[id];
        console.log('checking permission user role', this.roles);

        this.roles.permissions.forEach(element => {
        if (element.applicationName === val) {
          permissionArray.push(element.name);
        }
      });
        this.permissions = permissionArray;
      }
    );
    this.router.navigateByUrl('/Dashboard/' + val);
  }

  getMyApps(){
    this.Jarwis.getMe().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        return this.roles = this.me.roles;
      }
    );
  }

}
