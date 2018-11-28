import { Component, OnInit } from '@angular/core';
import { TableList, Header } from '../shared/tableConfiguration';
import { AdminConfig } from 'src/app/Admin/shared/AdminConfig';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ToolboxItem } from '../shared/ToolboxItem';


@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {

  constructor(public aconfig: AdminConfig) { }

  ngOnInit() {
  }
  // get tableList by Headers id
  public GetTableList(rowHeader: string): TableList[] {
    var list: TableList[] = [];
    for (var tl of this.aconfig.SelectedTable.Table.TableList) {
      if (tl.RId === rowHeader) {
        list.splice(Number(tl.CId), 0, tl);
      }
    }
    return list;
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


  public drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer.id);
    if (event.container == event.previousContainer) {
      // modify in own table
      for (var table of this.aconfig.SelectedTable.Table.TableList) {
        if (table.UniqueId === event.container.id) {
          var selectedItem = table.List[event.previousIndex];
          table.List.splice(event.previousIndex, 1);
          table.List.splice(event.currentIndex, 0, selectedItem);
        }
      }
    }
    else if (event.previousContainer.id == "toolboxList") {
      //add to list from toolbox
      for (var table of this.aconfig.SelectedTable.Table.TableList) {
        //if (table.UniqueId === event.previousContainer.id) {
        //  table.List.splice(event.previousIndex, 1);
        //}
        // add in new array
        if (table.UniqueId == event.container.id) {
          table.List.splice(event.currentIndex, 0, JSON.parse(JSON.stringify(this.aconfig.ToolBoxItems[event.previousIndex])));
        }
      }
    }
    else if (event.container.id == "toolboxList") {
      // delete from list
      for (var table of this.aconfig.SelectedTable.Table.TableList) {
        //remove from previous list
        if (table.UniqueId === event.previousContainer.id) {
          table.List.splice(event.previousIndex, 1);
        }
      }
    }
    else {
      //from list to list
      var itemToReplace: ToolboxItem;
      for (var table of this.aconfig.SelectedTable.Table.TableList) {
        if (table.UniqueId === event.previousContainer.id) {
          itemToReplace = table.List[event.previousIndex];
          table.List.splice(event.previousIndex, 1);
        }
      }
      for (var table of this.aconfig.SelectedTable.Table.TableList) {
        // add in new array
        if (table.UniqueId == event.container.id) {
          table.List.splice(event.currentIndex, 0, itemToReplace);
        }
      }
    }

    return;
  }


  // Table buttons
  public RemoveColumn(event: any) {
    for (var i = 0; i < this.aconfig.SelectedTable.Table.ColumnHeaders.length; i++) {
      // remove item
      if (this.aconfig.SelectedTable.Table.ColumnHeaders[i].Id === event) {
        this.aconfig.SelectedTable.Table.ColumnHeaders.splice(i, 1);
        i--;
      }
      else {
        if (this.aconfig.SelectedTable.Table.ColumnHeaders[i].Id > event) {
          this.aconfig.SelectedTable.Table.ColumnHeaders[i].Id = (Number(this.aconfig.SelectedTable.Table.ColumnHeaders[i].Id) - 1).toString();
        }
      }
    }

    // remove TableList for CHeader
    for (var i = 0; i < this.aconfig.SelectedTable.Table.TableList.length; i++) {
      this.aconfig.SelectedTable.Table.TableList[i].UniqueId = i.toString();
      if (this.aconfig.SelectedTable.Table.TableList[i].CId === event) {
        this.aconfig.SelectedTable.Table.TableList.splice(i, 1);
        i--; // after remove, table.length = -1;
      }
      else if (this.aconfig.SelectedTable.Table.TableList[i].CId > event) {
        this.aconfig.SelectedTable.Table.TableList[i].CId = (Number(this.aconfig.SelectedTable.Table.TableList[i].CId) - 1).toString();
      }
    }
    this.aconfig.UpdateSelectedTable();
  }

  public RemoveRow(event: any) {
    for (var i = 0; i < this.aconfig.SelectedTable.Table.RowHeaders.length; i++) {
      // remove item
      if (this.aconfig.SelectedTable.Table.RowHeaders[i].Id === event) {
        this.aconfig.SelectedTable.Table.RowHeaders.splice(i, 1);
        i--;
      }
      else {
        if (this.aconfig.SelectedTable.Table.RowHeaders[i].Id > event) {
          this.aconfig.SelectedTable.Table.RowHeaders[i].Id = (Number(this.aconfig.SelectedTable.Table.RowHeaders[i].Id) - 1).toString();
        }
      }
    }

    // remove TableList for CHeader
    for (var i = 0; i < this.aconfig.SelectedTable.Table.TableList.length; i++) {
      if (this.aconfig.SelectedTable.Table.TableList[i].RId === event) {
        this.aconfig.SelectedTable.Table.TableList.splice(i, 1);
        i--; // after remove, table.length = -1;
      }
      else if (this.aconfig.SelectedTable.Table.TableList[i].RId > event) {
        this.aconfig.SelectedTable.Table.TableList[i].RId = (Number(this.aconfig.SelectedTable.Table.TableList[i].RId) - 1).toString();
      }
    }
    this.aconfig.UpdateSelectedTable();
  }

  public AddColumn() {
    var newId = this.aconfig.SelectedTable.Table.ColumnHeaders.length;
    this.aconfig.SelectedTable.Table.ColumnHeaders.splice(this.aconfig.SelectedTable.Table.ColumnHeaders.length, 0, new Header(this.aconfig.SelectedTable.Table.ColumnHeaders.length.toString(), ""));
    this.aconfig.SelectedTable.Table.RowHeaders.forEach((item, index) => {
      this.aconfig.SelectedTable.Table.TableList.splice(this.aconfig.SelectedTable.Table.TableList.length, 0, new TableList((this.aconfig.SelectedTable.Table.TableList.length).toString(),
        (newId).toString(),
        item.Id, []));
    });
    this.aconfig.UpdateSelectedTable();
  }

  public AddRow() {
    var newId = this.aconfig.SelectedTable.Table.RowHeaders.length;
    this.aconfig.SelectedTable.Table.RowHeaders.splice(newId, 0, new Header(newId.toString(), ""));
    this.aconfig.SelectedTable.Table.ColumnHeaders.forEach((item, index) => {
      this.aconfig.SelectedTable.Table.TableList.splice(this.aconfig.SelectedTable.Table.TableList.length, 0, new TableList((this.aconfig.SelectedTable.Table.TableList.length).toString(),
        item.Id,
        (newId).toString(),
        []));
    });
    this.aconfig.UpdateSelectedTable();
  }

}
