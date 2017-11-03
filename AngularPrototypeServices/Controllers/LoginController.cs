using System;
using System.Configuration;
using System.Web.Http;
using System.Net;
using Newtonsoft.Json;
using PatientInquiryServices.Models;
using PatientInquiryServices.Utilities;
using PatientInquiryLogger;

namespace PatientInquiryServices.Controllers
{
    public class LoginController : ApiController
    {
        //Private members
        private static ILog log;
        //Public members
        string filePath, fileContent = "";

        /// <summary>
        /// Login Controller
        /// </summary>
        public LoginController()
        {
            var container = Injector.Instance;
            //Resolving the logger interface
            log = container.Resolve<ILog>();
        }
        /// <summary>
        /// Provides Host Information
        /// </summary>
        /// <returns>Host Information</returns>
        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetHostInfo()
        {
            try
            {
                ReadFileAndContent objReadFileAndContent = new ReadFileAndContent(log);

                //Get file path
                filePath = ConfigurationManager.AppSettings["DataPath"].ToString() + "\\" + LocaleUtil.UserLocale + "\\HostInfo.json";

                //Get file content
                fileContent = objReadFileAndContent.readFileContent(filePath);

                //Deserialize content to List of HostInfoModel
                HostInfoModel hostInfo = JsonConvert.DeserializeObject<HostInfoModel>(fileContent);
                return Ok(hostInfo);
            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
                return Content(HttpStatusCode.BadRequest, exp.Message.ToString());
            }
        }

    }
}
