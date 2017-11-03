using System.Collections.Generic;

namespace PatientInquiryServices.Models
{
    /// <summary>
    /// Patient's Test details
    /// </summary>
    public class PatientTestModel
    {
        /// <summary>
        /// PatientTestModel default constructor
        /// </summary>
        public PatientTestModel() { }

        /// <summary>
        /// Constructor to initialize PatientTestModel
        /// </summary>
        /// <param name="testResults">Test details of the accession</param>
        public PatientTestModel(TestResultsModel testResults)
        {
            PriorityCode = testResults.PriorityCode;
            TestName = testResults.TestName;
            TestCode = testResults.TestCode;
            NormalRange = testResults.NormalRange;
            PerformingLabCode = testResults.PerformingLabCode;
            Units = testResults.Units;
        }

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
        ///  The list of results associated with this test.
        /// </summary>
        public List<ResultsModel> Result { get; set; }
    }
}