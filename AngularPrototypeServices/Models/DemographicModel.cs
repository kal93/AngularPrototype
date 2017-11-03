using System;

namespace PatientInquiryServices.Models
{
    /// <summary>
    /// Model which holds demographic details of the patient
    /// </summary>
    public class DemographicModel
    {
        /// <summary>
        /// DemographicModel default constructor
        /// </summary>
        public DemographicModel()
        {
        }
        /// <summary>
        /// Constructor to initialize the demographic model
        /// </summary>
        /// <param name="demographicDetails">demographicDetails of the patient</param>
        public DemographicModel(AccessionBannerModel demographicDetails)
        {
            FirstName = demographicDetails.FirstName;
            AkaName = demographicDetails.AkaName;
            BillingAccountNumber = demographicDetails.BillingAccountNumber;
            BirthDateText = demographicDetails.BirthDateText;
            DateOfLastActivityText = demographicDetails.DateOfLastActivityText;
            Gender = demographicDetails.Gender;
            HospitalCode = demographicDetails.HospitalCode;
            LastName = demographicDetails.LastName;
            MiddleName = demographicDetails.MiddleName;
            MPI = demographicDetails.MPI;
            Name = demographicDetails.Name;
            SSN = demographicDetails.SSN;
            MedicalRecordNumber = demographicDetails.MedicalRecordNumber;
            PIDX = demographicDetails.PIDX;
            NHS = demographicDetails.NHS;
        }

        /// <summary>
        /// Patient's Alias
        /// </summary>
        public string AkaName { get; set; }
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
        /// Patient's name
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Patient's Medical Record Number
        /// </summary>
        public string MedicalRecordNumber { get; set; }
        /// <summary>
        /// Patient's Social Security Number
        /// </summary>
        public string SSN { get; set; }
        /// <summary>
        /// Patient's Gender
        /// </summary>
        public string Gender { get; set; }
        /// <summary>
        /// Patient's National Health Service Number
        /// </summary>
        public string NHS { get; set; }
        /// <summary>
        /// Patient's Index 
        /// </summary>
        public string PIDX { get; set; }
        /// <summary>
        /// Patient's last activity date
        /// </summary>
        public string DateOfLastActivityText { get; set; }
        /// <summary>
        /// Patient's Master patient Index
        /// </summary>
        public string MPI { get; set; }
        /// <summary>
        /// Patient's Hospital Code
        /// </summary>
        public string HospitalCode { get; set; }
        /// <summary>
        /// Patient's Billing Account Number
        /// </summary>
        public string BillingAccountNumber { get; set; }
    }
}
