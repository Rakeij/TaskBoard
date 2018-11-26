using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Server.Controllers
{
  public class ToolBoxController : ApiController
  {
    private readonly string path = @"\TaskBoardFiles\Toolbox\";

    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public IEnumerable<Models.ToolBoxItem> GetAllItems()
    {
      var result = new List<Models.ToolBoxItem>();
      try
      {
        var filePath = System.Web.Hosting.HostingEnvironment.MapPath(path);

        var files = new DirectoryInfo(filePath).GetFiles("*.json");

        foreach (var file in files)
        {
          result.AddRange(Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.ToolBoxItem>>(File.ReadAllText(file.FullName)));
        }
        return result;

      }
      catch (Exception)
      {
        return result;
      }
    }

    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public IEnumerable<Models.ToolBoxItem> Save([FromBody]List<Models.ToolBoxItem> toolboxItems)
    {
      var result = new List<Models.ToolBoxItem>();
      try
      {
        var filePath = System.Web.Hosting.HostingEnvironment.MapPath(path);

        var files = new DirectoryInfo(filePath).GetFiles("*.json");

        var file = files.FirstOrDefault();

        // save new file
        using (StreamWriter writer = new StreamWriter(file.FullName, false))
        {
          writer.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(toolboxItems));
        }


        return result;

      }
      catch (Exception)
      {
        return result;
      }
    }

    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public IEnumerable<Models.ToolBoxItem> Delete(int Id)
    {
      var result = new List<Models.ToolBoxItem>();
      try
      {
        var filePath = System.Web.Hosting.HostingEnvironment.MapPath(path);

        var files = new DirectoryInfo(filePath).GetFiles("*.json");

        var file = files.FirstOrDefault();
        result.AddRange(Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.ToolBoxItem>>(File.ReadAllText(file.FullName)));


        result.RemoveAll(x => x.Id == Id);

        // save new file
        using (StreamWriter writer = new StreamWriter(file.FullName, false))
        {
          writer.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(result));
        }


        return result;

      }
      catch (Exception)
      {
        return result;
      }
    }


  }
}