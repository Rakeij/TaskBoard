import { TableConfiguration, Table, TableList, Header } from "../shared/TableConfiguration";
import { ToolboxItem } from "../shared/ToolboxItem";
import { Injectable } from "@angular/core";


@Injectable()
export class AdminConfig {
  constructor(){
  this.ConnectedToList.push("toolboxList");
}

SelectedTable: TableConfiguration;
TableConfiguration: TableConfiguration[];
ToolBoxItems: ToolboxItem[];
ConnectedToList = [];

}
