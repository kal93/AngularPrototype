using System;
using System.Configuration;
using System.Web.Http;
using System.Net;
using Newtonsoft.Json;
using PatientInquiryServices.Models;
using PatientInquiryServices.Utilities;
using PatientInquiryLogger;
using System.Collections.Generic;
using System.Linq;
using PatientInquiryServices.Filters;

namespace PatientInquiryServices.Controllers
{
    /// <summary>
    /// User Controller class
    /// </summary>
    [PIAuthentication]
    public class UserController : ApiController
    {
        //Private members
        private static ILog log;
        //Public members
        string filePath, fileContent = "";

        /// <summary>
        /// User Controller
        /// </summary>
        public UserController()
        {
            var container = Injector.Instance;
            //Resolving the logger interface
            log = container.Resolve<ILog>();
        }

        /// <summary>
        /// Provides List of Users
        /// </summary>
        /// <returns>User List</returns>
        [HttpGet]
        public IHttpActionResult GetUserList()
        {
            try
            {
                ReadFileAndContent objReadFileAndContent = new ReadFileAndContent(log);

                //Get file path
                filePath = ConfigurationManager.AppSettings["DataPath"].ToString() + "\\" + LocaleUtil.UserLocale + "\\UserList.json";

                //Get file content
                fileContent = objReadFileAndContent.readFileContent(filePath);

                //Deserialize content to List of UserModel
                List<UserModel> userList = JsonConvert.DeserializeObject<List<UserModel>>(fileContent);
                return Ok(userList);
            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
                return Content(HttpStatusCode.BadRequest, exp.Message.ToString());
            }
        }

        /// <summary>
        /// Provides User Configuration
        /// </summary>
        /// <param name="userName">Logged in user</param>
        /// <returns>User Configuration</returns>
        [HttpPost]
        public IHttpActionResult GetUserSettings([FromBody]string userName)
        {
            try
            {
                ReadFileAndContent objReadFileAndContent = new ReadFileAndContent(log);
                
                //Get file path
                filePath = ConfigurationManager.AppSettings["DataPath"].ToString() + "\\" + LocaleUtil.UserLocale + "\\UserData\\" + userName + ".json";

                //Get file content
                fileContent = objReadFileAndContent.readFileContent(filePath);

                //Deserialize content to PatientSearchModel
                UserSettingsModel userSettings = JsonConvert.DeserializeObject<UserSettingsModel>(fileContent);
                return Ok(userSettings);
            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
                return Content(HttpStatusCode.BadRequest, exp.Message.ToString());
            }
        }
        /// <summary>
        /// This method updates the users list
        /// </summary>
        /// <param name="userFromClient">User that is updated in the client</param>
        /// <returns>Response</returns>
        [HttpPut]
        public IHttpActionResult UpdateUserList([FromBody] UserModel userFromClient)
        {
            ReadFileAndContent objUpdateContent = new ReadFileAndContent(log);
            try
            {
                ReadFileAndContent objReadFileAndContent = new ReadFileAndContent(log);

                //Get file path
                filePath = ConfigurationManager.AppSettings["DataPath"].ToString() + "\\" + LocaleUtil.UserLocale + "\\UserList.json";

                //Get file content
                fileContent = objReadFileAndContent.readFileContent(filePath);

                //Deserialize content to List of UserModel
                List<UserModel> userList = JsonConvert.DeserializeObject<List<UserModel>>(fileContent);

                foreach (var user in userList.Where(usr => usr.UserId == userFromClient.UserId))
                {
                    user.UserName = userFromClient.UserName;
                    user.UserDescription = userFromClient.UserDescription;
                    user.Name = userFromClient.Name;
                    user.HostSystem = userFromClient.HostSystem;
                    user.HostRole = userFromClient.HostRole;
                    user.Permissions = userFromClient.Permissions;
                }
                //Write the updated user list to the file
                string userFileContent = JsonConvert.SerializeObject(userList, Formatting.Indented);
                objUpdateContent.updateFileContent(filePath, userFileContent);
                return Ok("Updated successfully");
            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
                return Content(HttpStatusCode.BadRequest, exp.Message.ToString());
            }
        }
    }
}

