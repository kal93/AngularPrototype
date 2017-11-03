using System.Web;

namespace PatientInquiryServices.Common
{
    /// <summary>
    /// Class to provide helper functions for setting and retrieving items from the session
    /// </summary>
    public static class SessionHelper
    {
        /// <summary>
        /// Store value in the session
        /// </summary>
        /// <param name="tokenKey">Key to store the value</param>
        /// <param name="value">Value for the key</param>
        public static void SetInSession(string tokenKey, object value)
        {
            HttpContext.Current.Cache[tokenKey] = value;
        }

        /// <summary>
        /// Retrieve the value for the specified key from the session
        /// </summary>
        /// <param name="sessionKey">Key to retrieve</param>
        /// <returns>An object that must be cast to the proper type</returns>
        public static object GetFromSession(string sessionKey)
        {
            return HttpContext.Current.Cache[sessionKey];
        }
    }
}