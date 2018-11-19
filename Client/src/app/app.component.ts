import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private toolboxPosition: number;
  private firstCall = true;




  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    if (this.firstCall) {
      var element = document.getElementById('toolbox');
      if (element != null) {
        this.toolboxPosition = document.getElementById('toolbox').offsetTop;
        this.firstCall = false;
      }
    }

    var scrollLeft = document.getElementsByTagName('html')[0].scrollLeft;
    var scrollTop = document.getElementsByTagName('html')[0].scrollTop;
    //var toolboxPosition = document.getElementById('toolbox').offsetTop;
    document.getElementById('toolbox').style.marginLeft = scrollLeft.toString() + "px";
    if (this.toolboxPosition <= scrollTop) {
      console.log(this.toolboxPosition);
      //console.log('toolboxPosition' + toolboxPosition);
      document.getElementById('toolbox').style.marginTop = (scrollTop - this.toolboxPosition).toString() + "px";
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.toolboxPosition = document.getElementById('toolbox').offsetTop;
    this.firstCall = true;
  }


}
