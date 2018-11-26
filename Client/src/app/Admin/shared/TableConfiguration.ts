import { ToolboxItem } from "../shared/ToolboxItem";


export class TableConfiguration {
  public Id: number;
  public Table: Table;
  public Name: string;
  public Active: boolean;
}


export class Table {
  constructor(tl: TableList[], rh: Header[], ch: Header[]) {
    this.TableList = tl;
    this.RowHeaders = rh;
    this.ColumnHeaders = ch;
  }

  public ColumnHeaders: Header[];
  public RowHeaders: Header[];
  public TableList: TableList[];


}

export class TableList {
  constructor(id: string, cid: string, rid, list: ToolboxItem[]) {
    this.RId = rid;
    this.CId = cid;
    this.List = list;
    this.UniqueId = id;
  }
  public UniqueId: string;
  public RId: string;
  public CId: string;
  public List: ToolboxItem[];
}

export class Header {
  constructor(id: string, value: string) {
    this.Id = id;
    this.Value = value;
  }
  public Id: string;
  public Value: string;
}

