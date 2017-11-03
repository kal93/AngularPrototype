using System;
using System.Collections.Generic;

namespace PatientInquiryServices.Models
{
    /// <summary>
    /// Patient's Accession details
    /// </summary>
    public class AccessionModel
    {
        /// <summary>
        /// AccessionModel default constructor
        /// </summary>
        public AccessionModel() { }
        /// <summary>
        /// Constructor to initialize the AccesionModel
        /// </summary>
        /// <param name="result">Result which contains the details</param>
        public AccessionModel(AccessionBannerModel result)
        {
            AccessionNumber = result.AccessionNumber;
            CollectDate = result.CollectDate;
            RecieveDate = result.RecieveDate;
            OrderingPhysician = result.OrderingPhysician;
            PIDX = result.PIDX;
            SpecimenDetails = result.SpecimenDetails;
            OrderAccountNo = result.OrderAccountNo;
            OrderLocation = result.OrderLocation;
            PatientConsent = result.PatientConsent;
        }

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
        /// Indicates the Patient ID to which this accession is related
        /// </summary>
        public string PIDX { get; set; }
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
        public List<PatientTestModel> Test { get; set; }
    }
}