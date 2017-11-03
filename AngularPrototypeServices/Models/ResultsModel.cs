namespace PatientInquiryServices.Models
{
    /// <summary>
    /// Patient's result details
    /// </summary>
    public class ResultsModel
    {
        /// <summary>
        /// ResultsModel default constructor
        /// </summary>
        public ResultsModel() { }

        /// <summary>
        /// Constructor to initialize the ResultsModel
        /// </summary>
        /// <param name="testResult">Result details of the test</param>
        public ResultsModel(TestResultsModel testResult)
        {
            ResultData = testResult.ResultData;
            ResultedTechCode = testResult.ResultedTechCode;
            ResultedTime = testResult.ResultedTime;
            ExternalQAFlags = testResult.ExternalQAFlags;
        }

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