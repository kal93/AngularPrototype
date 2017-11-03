using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PatientInquiryServices.Utilities
{
    /// <summary>
    /// Purpose of this class is to store utilities corresponding to Locale
    /// </summary>
    public class LocaleUtil
    {
        /// <summary>
        /// Gets User Language from Http Context and returns
        /// </summary>
        public static string UserLocale
        {
            get
            {
                return HttpContext.Current.Request.UserLanguages[0].ToString() == "es" || HttpContext.Current.Request.UserLanguages[0].ToString() == "tr" ? HttpContext.Current.Request.UserLanguages[0].ToString() : "en";
            }
        }
    }
}