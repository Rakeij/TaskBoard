import { Component, OnInit, Injectable, HostListener } from "@angular/core";
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from "@angular/http";
import { stringify } from "querystring";
import { environment } from "../../environments/environment";

declare var $: any;

@Component({
  selector: "Admin",
  templateUrl: "admin.component.html",
  styleUrls: ["admin.component.css", "switch.admin.component.css"],

})

@Injectable()
export class Admin implements OnInit {
  private url_NewConfiguration = "";
  private url_GetAllConfiguration = "";
  private url_Configuration_Save = "";

  public result: object;
  constructor(private http: HttpClient) {
    if (environment.production) {
      this.url_NewConfiguration = "api/Configurations/New";
      this.url_GetAllConfiguration = "api/Configurations/GetAll";
      this.url_Configuration_Save = "api/Configurations/Save";
    }
    else {
      this.url_NewConfiguration = "http://localhost:4201/Configurations/New";
      this.url_GetAllConfiguration = "http://localhost:4201/Configurations/GetAll";
      this.url_Configuration_Save = "http://localhost:4201/Configurations/Save";
    }
  }

 
  public GetAllConfigurations() {
    this.http.get(this.url_GetAllConfiguration).subscribe((apiResult: TableConfiguration[]) => {
      for (var result of apiResult) {
        this.TableConfiguration.push(result);
      }
    }, error => { });
  }

  public SaveConfiguration() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    this.http.post(this.url_Configuration_Save, JSON.stringify(this.selectedTable), httpOptions).subscribe((result) => {
      alert('Saved');
    });
  }

  public NewConfiguration() {
    this.http.get(this.url_NewConfiguration).subscribe(() => {
      this.TableConfiguration = [];
      this.GetAllConfigurations();
    }, error => { });

  }


  // get tableList by Headers id
  public GetTableList(rowHeader: string): TableList[] {
    var list: TableList[] = [];
    for (var tl of this.selectedTable.Table.TableList) {
      if (tl.RId === rowHeader) {
        list.splice(Number(tl.CId), 0, tl);
      }
    }
    return list;
  }

  public GetTableLength(ColHeader: string): number {
    var result: number;
    result = 1;
    for (var tl of this.selectedTable.Table.TableList) {
      if (tl.CId === ColHeader && result < tl.List.length) {
        result = tl.List.length;
      }
    }
    return (result * 80) + 70;
  }

  todo = [
    '../../assets/image/Appel.jpg',
    '../../assets/image/lunch.jpg',
    '../../assets/image/middagmaal-2.png',
    '../../assets/image/speeltuin.png',
    '../../assets/image/zondag-geel.png'
  ];
  selectedTable: TableConfiguration;

  TableConfiguration: TableConfiguration[];

  // link all lists to each other
  public ConnectedToList = [];
  ngOnInit(): void {

    this.ConnectedToList.push("toolboxList");
    this.TableConfiguration = [];
    this.GetAllConfigurations();
  }

  public drop(event: CdkDragDrop<string[]>) {

    for (var table of this.selectedTable.Table.TableList) {
      if (table.UniqueId == event.container.id) {
        table.List.splice(table.List.length, 0, event.previousContainer.data.toString().split(",")[event.previousIndex]);
      }
      //remove from previous list
      if (table.UniqueId === event.previousContainer.id) {
        table.List.splice(event.previousIndex, 1);
      }
    }
    return;
  }

  public UpdateSelectedTable() {
    this.selectedTable.Table.TableList.forEach((item) => {
      this.ConnectedToList.push(item.UniqueId);
    });
    console.log(this.ConnectedToList);
  }

  //Configuration Buttons
  public selectConfiguration(name: string) {
    this.TableConfiguration.forEach((item) => {
      if (item.Name === name) this.selectedTable = item;
    });
    this.UpdateSelectedTable();
  }
  public deleteConfiguration(name: string) {
    if (this.selectedTable != null && this.selectedTable.Name == name) {
      this.selectedTable = null;
    }
    this.TableConfiguration.forEach((item, index) => {
      if (item.Name == name) this.TableConfiguration.splice(index, 1); return;
    });
  }

  public isEmptyConfiguration(): boolean {
    var result = false;
    this.TableConfiguration.forEach((item) => { if (item.Name == "") { result = true } });
    return result;
  }

  public isDubbleNameUsed(): string {
    var result = null;
    this.TableConfiguration.forEach((item, index) => {
      this.TableConfiguration.forEach((item1, index1) => {
        if (item.Name.toUpperCase() === item1.Name.toUpperCase() && index != index1)
          result = "Naam moet uniek zijn!";
      })
    });
    return result;
  }



  // Table buttons
  public RemoveColumn(event: any) {
    for (var i = 0; i < this.selectedTable.Table.ColumnHeaders.length; i++) {
      // remove item
      if (this.selectedTable.Table.ColumnHeaders[i].Id === event) {
        this.selectedTable.Table.ColumnHeaders.splice(i, 1);
        i--;
      }
      else {
        if (this.selectedTable.Table.ColumnHeaders[i].Id > event) {
          this.selectedTable.Table.ColumnHeaders[i].Id = (Number(this.selectedTable.Table.ColumnHeaders[i].Id) - 1).toString();
        }
      }
    }

    // remove TableList for CHeader
    for (var i = 0; i < this.selectedTable.Table.TableList.length; i++) {
      this.selectedTable.Table.TableList[i].UniqueId = i.toString();
      if (this.selectedTable.Table.TableList[i].CId === event) {
        this.selectedTable.Table.TableList.splice(i, 1);
        i--; // after remove, table.length = -1;
      }
      else if (this.selectedTable.Table.TableList[i].CId > event) {
        this.selectedTable.Table.TableList[i].CId = (Number(this.selectedTable.Table.TableList[i].CId) - 1).toString();
      }
    }
    this.UpdateSelectedTable();
  }

  public RemoveRow(event: any) {
    for (var i = 0; i < this.selectedTable.Table.RowHeaders.length; i++) {
      // remove item
      if (this.selectedTable.Table.RowHeaders[i].Id === event) {
        this.selectedTable.Table.RowHeaders.splice(i, 1);
        i--;
      }
      else {
        if (this.selectedTable.Table.RowHeaders[i].Id > event) {
          this.selectedTable.Table.RowHeaders[i].Id = (Number(this.selectedTable.Table.RowHeaders[i].Id) - 1).toString();
        }
      }
    }

    // remove TableList for CHeader
    for (var i = 0; i < this.selectedTable.Table.TableList.length; i++) {
      if (this.selectedTable.Table.TableList[i].RId === event) {
        this.selectedTable.Table.TableList.splice(i, 1);
        i--; // after remove, table.length = -1;
      }
      else if (this.selectedTable.Table.TableList[i].RId > event) {
        this.selectedTable.Table.TableList[i].RId = (Number(this.selectedTable.Table.TableList[i].RId) - 1).toString();
      }
    }
    this.UpdateSelectedTable();
  }

  public AddColumn() {
    var newId = this.selectedTable.Table.ColumnHeaders.length;
    this.selectedTable.Table.ColumnHeaders.splice(this.selectedTable.Table.ColumnHeaders.length, 0, new Header(this.selectedTable.Table.ColumnHeaders.length.toString(), ""));
    this.selectedTable.Table.RowHeaders.forEach((item, index) => {
      this.selectedTable.Table.TableList.splice(this.selectedTable.Table.TableList.length, 0, new TableList((this.selectedTable.Table.TableList.length).toString(),
        (newId).toString(),
        item.Id, []));
    });
    this.UpdateSelectedTable();
  }

  public AddRow() {
    var newId = this.selectedTable.Table.RowHeaders.length;
    this.selectedTable.Table.RowHeaders.splice(newId, 0, new Header(newId.toString(), ""));
    this.selectedTable.Table.ColumnHeaders.forEach((item, index) => {
      this.selectedTable.Table.TableList.splice(this.selectedTable.Table.TableList.length, 0, new TableList((this.selectedTable.Table.TableList.length).toString(),
        item.Id,
        (newId).toString(),
        []));
    });
    this.UpdateSelectedTable();
  }
}

class TableConfiguration {
  public Id: number;
  public Table: Table;
  public Name: string;
  public Active: boolean;
}


class Table {
  constructor(tl: TableList[], rh: Header[], ch: Header[]) {
    this.TableList = tl;
    this.RowHeaders = rh;
    this.ColumnHeaders = ch;
  }

  public ColumnHeaders: Header[];
  public RowHeaders: Header[];
  public TableList: TableList[];
}

class TableList {
  constructor(id: string, cid: string, rid, list: string[]) {
    this.RId = rid;
    this.CId = cid;
    this.List = list;
    this.UniqueId = id;
  }
  public UniqueId: string;
  public RId: string;
  public CId: string;
  public List: string[];

}

class Header {
  constructor(id: string, value: string) {
    this.Id = id;
    this.Value = value;
  }
  public Id: string;
  public Value: string;
}

