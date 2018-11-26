import { Component, OnInit } from '@angular/core';
//import { AdminConfig } from '../shared/AdminConfig';
import { AdminConfig } from 'src/app/Admin/shared/AdminConfig';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TableConfiguration } from '../shared/tableConfiguration';

@Component({
  selector: 'app-select-table',
  templateUrl: './select-table.component.html',
  styleUrls: ['./select-table.component.css','switch.select-table.component.css']
})
export class SelectTableComponent implements OnInit {
  private url_NewConfiguration = "";
  private url_DeleteConfiguration = "";
  private url_GetAllConfiguration = "";
  private url_Configuration_Save = "";


  constructor(private http: HttpClient, private aconfig: AdminConfig) { }
  ngOnInit() {
    if (environment.production) {
      this.url_NewConfiguration = "api/Configurations/New";
      this.url_DeleteConfiguration = "api/Configurations/Delete";
      this.url_GetAllConfiguration = "api/Configurations/GetAll";
      this.url_Configuration_Save = "api/Configurations/Save";

    }
    else {
      this.url_NewConfiguration = "http://localhost:4201/Configurations/New";
      this.url_DeleteConfiguration = "http://localhost:4201/Configurations/Delete";
      this.url_GetAllConfiguration = "http://localhost:4201/Configurations/GetAll";
      this.url_Configuration_Save = "http://localhost:4201/Configurations/Save";

    }

    this.GetAllConfigurations();
  }

  public ActivateDisactivateConfig(id: number) {
    this.aconfig.TableConfiguration[id].Active = !this.aconfig.TableConfiguration[id].Active;
    this.SaveConfiguration(this.aconfig.TableConfiguration[id]);
  }


  public UpdateSelectedTable() {
    this.aconfig.SelectedTable.Table.TableList.forEach((item) => {
      this.aconfig.ConnectedToList.push(item.UniqueId);
    });
    console.log(this.aconfig.ConnectedToList);
  }

  public selectConfiguration(name: string) {
    this.aconfig.TableConfiguration.forEach((item) => {
      if (item.Name === name) this.aconfig.SelectedTable = item;
    });
    this.UpdateSelectedTable();
    console.log(this.aconfig.SelectedTable.Id);
  }
  public deleteConfiguration(name: string) {
    this.aconfig.TableConfiguration.forEach((item) => {
      if (item.Name === name) this.DeleteConfiguration(item);
    });
  }
  public isEmptyConfiguration(): boolean {
    var result = false;
    this.aconfig.TableConfiguration.forEach((item) => { if (item.Name == "") { result = true } });
    return result;
  }
  public isDubbleNameUsed(): string {
    var result = null;
    this.aconfig.TableConfiguration.forEach((item, index) => {
      this.aconfig.TableConfiguration.forEach((item1, index1) => {
        if (item.Name.toUpperCase() === item1.Name.toUpperCase() && index != index1)
          result = "Naam moet uniek zijn!";
      })
    });
    return result;
  }


  //Api Calls
  public GetAllConfigurations() {
    this.aconfig.TableConfiguration = [];
    this.http.get(this.url_GetAllConfiguration).subscribe((apiResult: TableConfiguration[]) => {
      for (var result of apiResult) {
        this.aconfig.TableConfiguration.push(result);
      }
    }, error => { });
  }


  public NewConfiguration() {
    this.http.get(this.url_NewConfiguration).subscribe(() => {
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
    this.http.post(this.url_DeleteConfiguration, JSON.stringify(tableconfig), httpOptions).subscribe(() => {
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


}
