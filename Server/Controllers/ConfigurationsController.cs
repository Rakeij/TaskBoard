using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Server.Controllers
{
  public class ConfigurationsController : ApiController
  {
    private string path = @"\TaskBoardFiles\Test\";
    
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public IEnumerable<Models.TableConfiguration> GetAll()
    {
      var filePath = System.Web.Hosting.HostingEnvironment.MapPath(path);

      var files = new DirectoryInfo(filePath).GetFiles("*.json");
      var result = new List<Models.TableConfiguration>();

      foreach(var file in files)
      {
        result.Add(Newtonsoft.Json.JsonConvert.DeserializeObject<Models.TableConfiguration>(File.ReadAllText(file.FullName)));
      }

      return result;
    }

    [HttpPost]
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public string Save([FromBody]Models.TableConfiguration value)
    {
      try
      {
        if (value == null)
          return "Empty";
        
        var filePath = System.Web.Hosting.HostingEnvironment.MapPath(path);
        var document = value.Id + ".json";


        if (!Directory.Exists(filePath))
          Directory.CreateDirectory(filePath);

        using (StreamWriter writer = new StreamWriter(filePath + document, false))
        {
          writer.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(value));
        }
        return filePath + document;
      }
      catch (Exception ex)
      {
        return ex.Message;
      }
    }

    [HttpGet]
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public void New()
    {
      var filePath = System.Web.Hosting.HostingEnvironment.MapPath(path);
      var files = new DirectoryInfo(filePath).GetFiles("*.json");
      var idList = new List<int>();
      foreach (var file in files)
      {
        var id = int.Parse(file.Name.Split('.')[0]);
        idList.Add(id);
      }

      var newId = Enumerable.Range(0, 10).Except(idList).FirstOrDefault();
      if (newId == null)
        return;

      var document = newId + ".json";
      using (StreamWriter writer = new StreamWriter(filePath + document, false))
      {
        writer.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(new Models.TableConfiguration(newId)));
      }

    }
  }
}
