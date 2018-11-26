import { Component, OnInit } from '@angular/core';
import { AdminConfig } from 'src/app/Admin/shared/AdminConfig';
import { ToolboxItem } from '../shared/ToolboxItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {

  private url_ToolBox_GetAllItems= "";
  private url_ToolBox_Save = "";

  constructor(private http: HttpClient, private aconfig: AdminConfig) {
    if (environment.production) {
      this.url_ToolBox_GetAllItems = "api/ToolBox/GetAllItems";
      this.url_ToolBox_Save = "api/ToolBox/Save";
    }
    else {
      this.url_ToolBox_GetAllItems = "http://localhost:4201/ToolBox/GetAllItems";
      this.url_ToolBox_Save = "http://localhost:4201/ToolBox/Save";
    }
  }

  ngOnInit() {
    this.GetAllToolBoxItems();
  }

  
  // api calls
  public GetAllToolBoxItems() {
    this.aconfig.ToolBoxItems = [];
    this.http.get(this.url_ToolBox_GetAllItems).subscribe((apiResult: ToolboxItem[]) => {
      for (var result of apiResult) {
        this.aconfig.ToolBoxItems.push(result);
      }
    }, error => { });
  }

  public SaveToolBox() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    this.http.post(this.url_ToolBox_Save, JSON.stringify(this.aconfig.ToolBoxItems), httpOptions).subscribe((result) => {
      alert('updated');
    });
  }
}
