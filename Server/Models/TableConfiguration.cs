using System;
using System.Collections.Generic;

namespace Server.Models
{
  public class TableConfiguration
  {
    public TableConfiguration(int id)
    {
      this.Id = id;
      this.Table = new Table();
      this.Name = "";
    }
    public int Id { get; set; }
    public string Name { get; set; }
    public bool Active { get; set; }
    public Table Table { get; set; }
  }
  public class Table
  {
    public Table()
    {
      this.ColumnHeaders = new List<Header>();
      this.RowHeaders = new List<Header>();
      this.TableList = new List<TableList>();
    }
    public List<Header> ColumnHeaders { get; set; }
    public List<Header> RowHeaders { get; set; }
    public List<TableList> TableList { get; set; }

  }
  public class Header
  {
    public string Id { get; set; }
    public string Value { get; set; }
  }
  public class TableList
  {
    public TableList()
    {
      this.List = new List<string>();
    }
    public String UniqueId { get; set; }
    public string RId { get; set; }
    public string CId { get; set; }
    public List<String> List { get; set; }
  }

}