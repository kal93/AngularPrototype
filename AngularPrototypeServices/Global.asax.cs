using System;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using System.Web.SessionState;

namespace PatientInquiryServices
{
    /// <summary>
    /// Used for application and session start/end events and for global error handling.
    /// </summary>
    public class WebApiApplication : System.Web.HttpApplication
    {
        public override void Init()
        {
            // Delegate to allow WEB API to save session 
            this.PostAuthenticateRequest += MvcApplication_PostAuthenticateRequest;
            base.Init();
        }

        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
        protected void Application_BeginRequest(Object sender, EventArgs e)
        {            
           if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.AddHeader("Cache-Control", "no-cache");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
                HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
               HttpContext.Current.Response.End();
            }
        }

        protected void Session_Start()
        {
            Session.Timeout = Convert.ToInt16(FormsAuthentication.Timeout.TotalMinutes);
        }
        /// <summary>
        /// Delegate to allow WEB API to save session 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        void MvcApplication_PostAuthenticateRequest(object sender, EventArgs e)
        {
            System.Web.HttpContext.Current.SetSessionStateBehavior(
                SessionStateBehavior.Required);
        }
    }
}
