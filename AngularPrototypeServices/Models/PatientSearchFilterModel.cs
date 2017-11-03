using System;

namespace PatientInquiryServices.Models
{
    public class PatientSearchFilterModel
    {
        /// <summary>
        /// Patient's BirthDate Text
        /// </summary>
        public string BirthDateText { get; set; }
        /// <summary>
        /// Patient's last name
        /// </summary>        
        public string LastName { get; set; }
        /// <summary>
        /// Patient's first name
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        /// Patient's middle name
        /// </summary>
        public string MiddleName { get; set; }
        /// <summary>
        /// Patient's Index 
        /// </summary>
        public string PIDX { get; set; }
        /// <summary>
        /// Patient's National Health Service Number
        /// </summary>
        public string NHS { get; set; }
        /// <summary>
        /// Patient's Billing Account Number
        /// </summary>
        public string BillingAccountNumber { get; set; }
        /// <summary>
        /// Patient's Master patient Index
        /// </summary>
        public string MPI { get; set; }
        /// <summary>
        /// Hospital code of the patient
        /// </summary>
        public string[] HospitalCode { get; set; }
    }    
}