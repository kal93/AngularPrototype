using System;
using System.Net;
using Newtonsoft.Json;
using PatientInquiryServices.Models;
using System.Web.Http;
using PatientInquiryServices.Jwt;
using PatientInquiryServices.Utilities;
using System.Configuration;
using PatientInquiryLogger;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using PatientInquiryServices.Common;

namespace PatientInquiryServices.Controllers
{
    /// <summary>
    /// Class to Authenticate User 
    /// </summary>
    public class AuthController : ApiController
    {
        // Private members
        // Logger Instance for logging
        private static ILog log;

        //AuthController constructor
        public AuthController()
        {
            var container = Injector.Instance;
            // Resolving the logger interface
            log = container.Resolve<ILog>();
        }

        // Public methods
        /// <summary>
        /// Method to Authenticate User  
        /// </summary>
        /// <param name="userModel">User model that has to be authenticated</param>
        /// <returns>Authentication response object</returns>
        [HttpPost]
        [AllowAnonymous]
        public IHttpActionResult AuthenticateUser([FromBody]UserModel userModel)
        {
            // To store authentication response as JSON
            AuthenticationResponse authResponseObject = new AuthenticationResponse();

            authResponseObject.token = null;
            authResponseObject.error = null;
            try
            {   // Condition to check the user in database
                if (CheckUserInDatabase(userModel.UserName, userModel.Password, userModel.HostSystem, userModel.HostRole))
                {
                    authResponseObject.Permissions = getUserPermissions(userModel.UserName);
                    authResponseObject.token = JwtManager.GenerateToken(userModel.UserName);
                    // Storing authentication token into server session to validate the next service calls
                    SessionHelper.SetInSession(SessionKeys.AuthUserToken, authResponseObject.token);
                    return Ok(authResponseObject);
                }
                // If user not exists in database
                authResponseObject.error = "User Not Found";
                return Ok(authResponseObject);
            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
                return Content(HttpStatusCode.BadRequest, exp.Message.ToString());
            }
        }
        /// <summary>
        /// Method to check the user in database (Username, Password, Host System and Host role - Check the host details also with username and password for Validation)
        /// </summary>
        /// <param name="userName">User name of the user </param>
        /// <param name="password">password of the user</param>
        /// <param name="hostSytem">Host system of the user</param>
        /// <param name="hostRole">Host role of the user</param>
        /// <returns>Returns true if user exists in database if not return false</returns>
        public bool CheckUserInDatabase(string userName, string password, string hostSytem, string hostRole)
        {
            try
            {
                string filePath, fileContent = "";
                ReadFileAndContent objReadFileAndContent = new ReadFileAndContent(log);

                // Get file path
                filePath = ConfigurationManager.AppSettings["DataPath"].ToString() + "\\" + LocaleUtil.UserLocale + "\\UserList.json";

                // Get file content
                fileContent = objReadFileAndContent.readFileContent(filePath);

                IEnumerable<UserModel> userList = JsonConvert.DeserializeObject<IEnumerable<UserModel>>(fileContent);

                // In real time project password should store as password datatype - Here we have used annotation for the property in user model 
                bool userExists = (from users in userList
                                   where users.UserName == userName && users.Password == password && users.HostSystem == hostSytem && users.HostRole == hostRole
                                   select users).Any();

                return userExists;
            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
                return false;
            }
        }
        /// <summary>
        /// Method to get user permissions 
        /// </summary>
        /// <param name="username">Log-in username</param>
        /// <returns>user permissions</returns>
        //[HttpPost]
        public string getUserPermissions(string userName)
        {
            try
            {
                string filePath, fileContent = "";
                ReadFileAndContent objReadFileAndContent = new ReadFileAndContent(log);

                // Get file path
                filePath = ConfigurationManager.AppSettings["DataPath"].ToString() + "\\" + LocaleUtil.UserLocale + "\\UserList.json";

                // Get file content
                fileContent = objReadFileAndContent.readFileContent(filePath);

                IEnumerable<UserModel> userList = JsonConvert.DeserializeObject<IEnumerable<UserModel>>(fileContent);

                string permissions = (from users in userList
                                      where users.UserName == userName
                                      select users.Permissions).First().ToString();
                return permissions;

            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
                return null;
            }
        }

    }
}
