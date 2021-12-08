import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';

declare let $: any;
declare let swal: any;
declare let toastr: any;

@Component({
  selector: 'app-general-navbar',
  templateUrl: './general-navbar.component.html',
  styleUrls: ['./general-navbar.component.css']
})
export class GeneralNavbarComponent implements OnInit {

  public loggedIn : boolean;

  constructor(
    private Auth : AuthService,
    private router  : Router,
    private Token : TokenService
  ) { }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor(( new Date).getTime() / 1000)) >= expiry;
  }

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(Value => this.loggedIn = Value);

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
      $('#item ng-container').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }

  logout( Event : MouseEvent) {
    Event.preventDefault();
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    this.Token.remove2();
    localStorage.removeItem('reload');
    this.router.navigateByUrl('/login');
  }

}

