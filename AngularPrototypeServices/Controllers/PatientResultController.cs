using Newtonsoft.Json;
using PatientInquiryServices.Models;
using PatientInquiryServices.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Http;
using PatientInquiryLogger;
using System.Net;
using PatientInquiryServices.Filters;

namespace PatientInquiryServices.Controllers
{
    /// <summary>
    /// Patient Results controller  
    /// </summary>
    [PIAuthentication]
    public class PatientResultsController : ApiController
    {
        //Private members
        //Logger Instance for logging
        private static ILog log;

        //Patients results controller constructor
        public PatientResultsController()
        {
            var container = Injector.Instance;
            //Resolving the logger interface
            log = container.Resolve<ILog>();
        }

        /// <summary>
        /// Performs Linq queries to retrieve the patient result list 
        /// </summary>
        /// <param name="patientIndices">patient index of the selected patients whose results need to be displayed</param>
        /// <returns>Response with matched patients object</returns>
        [HttpPost]
        public IHttpActionResult GetPatientResults([FromBody]string[] patientIndices)
        {
            try
            {
                string[] filePaths;
                string fileContentOfDirectory;
                List<AccessionBannerModel> matchedResultsForGrid = new List<AccessionBannerModel>();
                AccessionBannerModel accessionBanner = null;

                // Reading the file directory and its contents
                ReadPatientDataDirectory objReadDirectory = new ReadPatientDataDirectory();
                ReadFileAndContent objReadFileAndContent = new ReadFileAndContent(log);
                //Reading the data files from DataPath and converting it into array
                objReadDirectory.DataPath = ConfigurationManager.AppSettings["DataPath"].ToString() + "\\" + LocaleUtil.UserLocale + "\\PatientData\\";

                filePaths = objReadFileAndContent.getFilesFromDirectory(objReadDirectory.DataPath);
                fileContentOfDirectory = objReadFileAndContent.fetchPatientFileContent(filePaths, ".json");
                fileContentOfDirectory = "[" + fileContentOfDirectory + "]";
                IEnumerable<PatientModel> patientList = JsonConvert.DeserializeObject<IEnumerable<PatientModel>>(fileContentOfDirectory);
                //lambda expression for patient results
                var matchedPatientsResults = patientList.Where(p => patientIndices.Contains(p.PatientDemographics.PIDX));
                //Modifying the model, to the requirements of the ag-grid
                foreach (var patientDetails in matchedPatientsResults)
                {
                    List<TestResultsModel> resultList = null;
                    foreach (var accessionDetails in patientDetails.Accession)
                    {
                        accessionBanner = new AccessionBannerModel();
                        accessionBanner.AkaName = patientDetails.PatientDemographics.AkaName;
                        accessionBanner.BirthDateText = patientDetails.PatientDemographics.BirthDateText;
                        accessionBanner.LastName = patientDetails.PatientDemographics.LastName;
                        accessionBanner.FirstName = patientDetails.PatientDemographics.FirstName;
                        accessionBanner.MiddleName = patientDetails.PatientDemographics.MiddleName;
                        accessionBanner.Name = patientDetails.PatientDemographics.Name;
                        accessionBanner.MedicalRecordNumber = patientDetails.PatientDemographics.MedicalRecordNumber;
                        accessionBanner.SSN = patientDetails.PatientDemographics.SSN;
                        accessionBanner.Gender = patientDetails.PatientDemographics.Gender;
                        accessionBanner.NHS = patientDetails.PatientDemographics.NHS;
                        accessionBanner.PIDX = patientDetails.PatientDemographics.PIDX;
                        accessionBanner.MPI = patientDetails.PatientDemographics.MPI;
                        accessionBanner.DateOfLastActivityText = patientDetails.PatientDemographics.DateOfLastActivityText;
                        accessionBanner.HospitalCode = patientDetails.PatientDemographics.HospitalCode;
                        accessionBanner.BillingAccountNumber = patientDetails.PatientDemographics.BillingAccountNumber;
                        accessionBanner.AccessionNumber = accessionDetails.AccessionNumber;
                        accessionBanner.CollectDate = accessionDetails.CollectDate;
                        accessionBanner.RecieveDate = accessionDetails.RecieveDate;
                        accessionBanner.OrderingPhysician = accessionDetails.OrderingPhysician;
                        accessionBanner.PIDX = accessionDetails.PIDX;
                        accessionBanner.OrderAccountNo = accessionDetails.OrderAccountNo;
                        accessionBanner.SpecimenDetails = accessionDetails.SpecimenDetails;
                        accessionBanner.OrderLocation = accessionDetails.OrderLocation;
                        accessionBanner.PatientConsent = accessionDetails.PatientConsent;
                        resultList = new List<TestResultsModel>();

                        foreach (var testDetails in accessionDetails.Test)
                        {
                            foreach (var resultDetails in testDetails.Result)
                            {
                                TestResultsModel testResults = new TestResultsModel();
                                testResults.Callback = testDetails.Callback;
                                testResults.TestName = testDetails.TestName;
                                testResults.NormalRange = testDetails.NormalRange;
                                testResults.Units = testDetails.Units;
                                testResults.PriorityCode = testDetails.PriorityCode;
                                testResults.PerformingLabCode = testDetails.PerformingLabCode;
                                testResults.TestCode = testDetails.TestCode;
                                testResults.ResultData = resultDetails.ResultData;
                                testResults.ResultedTechCode = resultDetails.ResultedTechCode;
                                testResults.ResultedTime = resultDetails.ResultedTime;
                                testResults.ExternalQAFlags = resultDetails.ExternalQAFlags;
                                resultList.Add(testResults);
                            }
                        }
                        accessionBanner.TestResults = resultList;
                        matchedResultsForGrid.Add(accessionBanner);
                    }
                }
                return Ok(matchedResultsForGrid);
            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
                return Content(HttpStatusCode.BadRequest, exp.Message.ToString());
            }
        }
    }
}
