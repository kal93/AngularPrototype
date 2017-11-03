using System.Collections.Generic;

namespace PatientInquiryServices.Models
{
    /// <summary>
    /// Model which holds demographic and the accession details of the patient
    /// </summary>
    public class PatientModel
    {
        /// <summary>
        ///  The list of accessions associated with the patient.
        /// </summary>      
        public List<AccessionModel> Accession { get; set; }
        /// <summary>
        ///  The demographic details of the patient.
        /// </summary>
        public DemographicModel PatientDemographics { get; set; }        
    }
}