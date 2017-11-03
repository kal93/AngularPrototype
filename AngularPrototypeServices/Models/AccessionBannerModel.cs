using System;
using System.Collections.Generic;

namespace PatientInquiryServices.Models
{
    /// <summary>
    /// Patient's demographics and accession details as required for the result page
    /// </summary>
    public class AccessionBannerModel
    {
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
        /// Patient's Middle name
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
        /// <summary>
        /// Indicates the Accession Number 
        /// </summary>
        public string AccessionNumber { get; set; }
        /// <summary>
        /// Indicates the Collected date of the specimen 
        /// </summary>
        public DateTime CollectDate { get; set; }
        /// <summary>
        /// Indicates the Received date of the specimen at the lab
        /// </summary>
        public DateTime RecieveDate { get; set; }
        /// <summary>
        /// Indicates the Physician name who ordered the test
        /// </summary>
        public string OrderingPhysician { get; set; }       
        /// <summary>
        /// Indicates the details of the specimen
        /// </summary>
        public string SpecimenDetails { get; set; }
        /// <summary>
        /// Indicates the Order Number to which the accession is related
        /// </summary>
        public string OrderAccountNo { get; set; }
        /// <summary>
        /// Indicates the Location at which the order was collected
        /// </summary>
        public string OrderLocation { get; set; }
        /// <summary>
        /// Indicates the Patient Consent
        /// </summary>
        public string PatientConsent { get; set; }
        /// <summary>
        ///  The list of tests associated with the accession.
        /// </summary>
        public List<TestResultsModel> TestResults { get; set; }        
    }
}