import { Component, OnInit, Injectable, HostListener } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminConfig } from 'src/app/Admin/shared/AdminConfig';

@Component({
  selector: "Admin",
  templateUrl: "admin.component.html",
  styleUrls: ["admin.component.css"],
  
})

@Injectable()
export class Admin implements OnInit {
  constructor(private aconfig: AdminConfig) {
   
  }
  
  ngOnInit(): void {
  }


  // ScrollConfiguration
  private toolboxPosition: number;
  private firstCall = true;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    var element = document.getElementById('toolbox');
    if (element == null)
      return;

    if (this.firstCall) {
      this.toolboxPosition = document.getElementById('toolbox').offsetTop;
      this.firstCall = false;
    }

    var scrollLeft = document.getElementsByTagName('html')[0].scrollLeft;
    var scrollTop = document.getElementsByTagName('html')[0].scrollTop;
    //var toolboxPosition = document.getElementById('toolbox').offsetTop;
    document.getElementById('toolbox').style.marginLeft = scrollLeft.toString() + "px";
    if (this.toolboxPosition <= scrollTop) {
      document.getElementById('toolbox').style.marginTop = (scrollTop - this.toolboxPosition).toString() + "px";
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (document.getElementById('toolbox') == null)
      return;

    this.toolboxPosition = document.getElementById('toolbox').offsetTop;
    this.firstCall = true;
  }
}


