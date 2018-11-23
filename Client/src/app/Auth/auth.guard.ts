import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginToken } from '../shared/logintoken';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginToken: LoginToken) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    console.log(this.loginToken.IsValid);
    if (this.loginToken.IsValid)
      return true;

    this.loginToken.Url = this.router.url;
    this.router.navigate(['/Login']);
    return false;
  }


}
