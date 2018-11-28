import { TableConfiguration, Table, TableList, Header } from "../shared/TableConfiguration";
import { ToolboxItem } from "../shared/ToolboxItem";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable()
export class AdminConfig {
  private url_Configuration_New = "";
  private url_Configuration_Delete = "";
  private url_Configuration_GetAll = "";
  private url_Configuration_Save = "";

  private url_ToolBox_GetAllItems = "";
  private url_ToolBox_Save = "";

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.url_Configuration_New = "api/Configurations/New";
      this.url_Configuration_Delete = "api/Configurations/Delete";
      this.url_Configuration_GetAll = "api/Configurations/GetAll";
      this.url_Configuration_Save = "api/Configurations/Save";

      this.url_ToolBox_GetAllItems = "api/ToolBox/GetAllItems";
      this.url_ToolBox_Save = "api/ToolBox/Save";
    }
    else {
      this.url_Configuration_New = "http://localhost:4201/Configurations/New";
      this.url_Configuration_Delete = "http://localhost:4201/Configurations/Delete";
      this.url_Configuration_GetAll = "http://localhost:4201/Configurations/GetAll";
      this.url_Configuration_Save = "http://localhost:4201/Configurations/Save";

      this.url_ToolBox_GetAllItems = "http://localhost:4201/ToolBox/GetAllItems";
      this.url_ToolBox_Save = "http://localhost:4201/ToolBox/Save";

    }

    this.ConnectedToList.push("toolboxList");
  }

  SelectedTable: TableConfiguration;
  TableConfiguration: TableConfiguration[];
  ToolBoxItems: ToolboxItem[];
  ConnectedToList = [];

  public UpdateSelectedTable() {
    this.SelectedTable.Table.TableList.forEach((item) => {
      this.ConnectedToList.push(item.UniqueId);
    });
    console.log(this.ConnectedToList);
  }

  //Api Calls
  public GetAllConfigurations() {
    this.TableConfiguration = [];
    this.http.get(this.url_Configuration_GetAll).subscribe((apiResult: TableConfiguration[]) => {
      for (var result of apiResult) {
        this.TableConfiguration.push(result);
      }
    }, error => { });
  }
  public NewConfiguration() {
    this.http.get(this.url_Configuration_New).subscribe(() => {
      this.GetAllConfigurations();
    }, error => { });

  }
  public DeleteConfiguration(tableconfig: TableConfiguration) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    this.http.post(this.url_Configuration_Delete, JSON.stringify(tableconfig), httpOptions).subscribe(() => {
      this.GetAllConfigurations();
    }, error => { });
  }
  public SaveConfiguration(config: TableConfiguration) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    this.http.post(this.url_Configuration_Save, JSON.stringify(config), httpOptions).subscribe((result) => {
      alert('Saved');
    });
  }

  // api calls
  public GetAllToolBoxItems() {
    this.ToolBoxItems = [];
    this.http.get(this.url_ToolBox_GetAllItems).subscribe((apiResult: ToolboxItem[]) => {
      for (var result of apiResult) {
        this.ToolBoxItems.push(result);
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
    this.http.post(this.url_ToolBox_Save, JSON.stringify(this.ToolBoxItems), httpOptions).subscribe((result) => {
      alert('updated');
    });
  }


}
