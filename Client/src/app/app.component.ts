import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginToken } from './shared/logintoken';
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements CanActivate {
  title = 'app';

  constructor(private loginToken: LoginToken) {

  }

  canActivate() {
    return this.loginToken.IsValid;
  }


}
