using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.Models
{
  public class ToolBoxItem
  {
    public ToolBoxItem()
    {

    }
    public int Id { get; set; }
    public string Image { get; set; }
    public string Text { get; set; }
  }
}