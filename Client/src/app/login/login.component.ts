import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginToken } from '../shared/logintoken';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class Login {

  constructor(private router: Router, public loginToken: LoginToken) {
  }

  ngOnInit() {
  }

  public InvalidLogin = false;
  public Username: string;
  public Password: string;

  public Login() {
    this.loginToken.Username = this.Username;
    this.loginToken.Password = this.Password;
    if (this.loginToken.IsValid) {
      if (this.loginToken.Url != null) {
        this.router.navigate([this.loginToken.Url]);
        return;
      }
      this.router.navigate(['/Home']);

    }
    this.InvalidLogin = true;
  }

}
