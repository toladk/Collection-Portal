import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoadingTwo = false;
  checkingeSuccessError: any;

  public form = {
    // email : null,
    username : null,
    password : null
  };

  public error = null;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private notification: NzNotificationService
              ) { }

  onSubmit(){
    this.isLoadingTwo = true;
    this.Jarwis.login(this.form).subscribe(
     data => this.handleResponse(data),
     error => this.handleError(error)
     );
  }

  handleResponse(data){
    // this.Token.handle(data.access_token);
    this.checkingeSuccessError = data.error;
    const IsSuccess: any = data.isSuccess;

    if(IsSuccess === true){
      this.Token.handle(data.value);
      this.Token.handle2('none');
      this.Token.user(this.form.username);
      this.Auth.changeAuthStatus(true);
      this.isLoadingTwo = false;
      this.router.navigateByUrl('/my-apps').then(() => {window.location.reload();});
    } else {
      this.isLoadingTwo = false;
      this.notification.error('Login', this.checkingeSuccessError);
    }
  }

  handleError(error){
    this.isLoadingTwo = false;
    this.error = error.error.error;
    this.notification.error('Login', this.error);
  }

  ngOnInit(): void {
  }

}
