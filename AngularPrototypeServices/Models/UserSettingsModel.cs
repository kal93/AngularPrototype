using System.Collections.Generic;

namespace PatientInquiryServices.Models
{
    /// <summary>
    /// Model that holds Date format,List of HID's,Default HID associated to user
    /// </summary>
    public class UserSettingsModel
    {
        /// <summary>
        /// Date format associated to user
        /// </summary>
        public string DateFormat { get; set; }
        /// <summary>
        /// List of HID's associated to user
        /// </summary>
        public List<string> HidList { get; set; }
        /// <summary>
        /// Default Hid associated to user
        /// </summary>
        public string DefaultHid { get; set; }
    }
}