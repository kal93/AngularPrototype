using Newtonsoft.Json;
using PatientInquiryLogger;
using PatientInquiryServices.Filters;
using PatientInquiryServices.Models;
using PatientInquiryServices.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Web.Http;

namespace PatientInquiryServices.Controllers
{
    [PIAuthentication]
    /// <summary>
    /// Update results controller
    /// </summary>
    public class UpdateResultsController : ApiController
    {
        //Private members
        private static ILog log;

        //Update results constructor
        public UpdateResultsController()
        {
            var container = Injector.Instance;
            //Resolving the logger interface
            log = container.Resolve<ILog>();
        }

        /// <summary>
        /// Performs LINQ queries to update the patient result list 
        /// </summary>
        /// <param name="resultsToUpdate">patient results of the selected patients whose results need to be displayed</param>
        /// <returns>Response </returns>
        [HttpPut]
        public IHttpActionResult UpdateResults([FromBody]AccessionBannerModel[] resultsToUpdate)
        {
            ReadFileAndContent objUpdateContent = new ReadFileAndContent(log);
            try
            {
                //Convert the object back to the model of the json file 
                PatientModel patientModel = null;
                DemographicModel demographicModel = null;
                List<AccessionModel> accessionlist = new List<AccessionModel>();
                List<PatientModel> patientModelList = new List<PatientModel>();
                foreach (var result in resultsToUpdate)
                {
                    List<PatientTestModel> testlist = new List<PatientTestModel>();
                    List<ResultsModel> resultlist = new List<ResultsModel>();
                    PatientTestModel testmodel = null;
                    AccessionModel accession = new AccessionModel(result);

                    string testCode = string.Empty;
                    foreach (var testResult in result.TestResults)
                    {
                        ResultsModel resultModel = null;
                        if (testmodel == null || testmodel.TestCode != testResult.TestCode)
                        {
                            resultlist = new List<ResultsModel>();
                            testmodel = new PatientTestModel(testResult);
                            resultModel = new ResultsModel(testResult);

                            resultlist.Add(resultModel);
                            testmodel.Result = resultlist;
                            testlist.Add(testmodel);
                        }
                        else
                        {
                            resultModel = new ResultsModel(testResult);
                            resultlist.Add(resultModel);
                            testmodel.Result = resultlist;
                        }
                    }
                    if (patientModel == null || demographicModel.PIDX != result.PIDX)
                    {
                        patientModel = new PatientModel();
                        demographicModel = new DemographicModel(result);
                        accessionlist = new List<AccessionModel>();

                        patientModel.PatientDemographics = demographicModel;
                        patientModelList.Add(patientModel);
                    }
                    accession.Test = testlist;
                    accessionlist.Add(accession);
                    patientModel.Accession = accessionlist;
                }
                string patientFile, patientFileContent;
                string patientDataPath = ConfigurationManager.AppSettings["DataPath"].ToString() + "\\" + LocaleUtil.UserLocale + "\\PatientData\\";

                foreach (var patientObject in patientModelList)
                {
                    patientFile = patientDataPath + patientObject.PatientDemographics.PIDX + ".json";
                    patientFileContent = JsonConvert.SerializeObject(patientObject, Formatting.Indented);
                    objUpdateContent.updateFileContent(patientFile, patientFileContent);
                }
                return Ok("Results updated");
            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
                return Content(HttpStatusCode.BadRequest, exp.Message.ToString());
            }
        }
    }
}
