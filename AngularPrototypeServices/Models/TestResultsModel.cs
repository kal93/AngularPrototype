namespace PatientInquiryServices.Models
{
    /// <summary>
    /// Patient's result and test details as required for the result page
    /// </summary>
    public class TestResultsModel
    {
        /// <summary>
        /// Patient's Test details
        /// </summary>
        public string TestName { get; set; }
        /// <summary>
        /// Units for the Test 
        /// </summary>
        public string Units { get; set; }
        /// <summary>
        /// Value to indicate the permitted range 
        /// </summary>
        public string NormalRange { get; set; }
        /// <summary>
        /// Comments for the test
        /// </summary>
        public string Callback { get; set; }
        /// <summary>
        /// Priority for the test
        /// </summary>
        public string PriorityCode { get; set; }
        /// <summary>
        /// Code of the lab which is performing the test
        /// </summary>
        public string PerformingLabCode { get; set; }
        /// <summary>
        /// Code of the test
        /// </summary>
        public string TestCode { get; set; }
        /// <summary>
        /// Result's details
        /// </summary>
        public string ResultData { get; set; }
        /// <summary>
        /// TechCode of the resultant
        /// </summary>
        public string ResultedTechCode { get; set; }
        /// <summary>
        /// Time of the result generation
        /// </summary>
        public string ResultedTime { get; set; }
        /// <summary>
        /// Flag to indicate if the result is out of range
        /// (Quality Assurance Definition)
        /// </summary>
        public string ExternalQAFlags { get; set; }
    }
}