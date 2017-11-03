using Newtonsoft.Json;
using PatientInquiryLogger;
using PatientInquiryServices.Filters;
using PatientInquiryServices.Models;
using PatientInquiryServices.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Reflection;
using System.Web.Http;

namespace PatientInquiryServices.Controllers
{
    /// <summary>
    /// Patient List controller
    /// </summary>
    [PIAuthentication]
    public class PatientListController : ApiController
    {
        //Private members
        //Logger Instance for logging
        private static ILog _log;

        public PatientListController()
        {
            var container = Injector.Instance;
            //Resolving the logger interface
            _log = container.Resolve<ILog>();
        }

        /// <summary>
        /// Performs LINQ queries to retrieve the patient list
        /// </summary>
        /// <param name="patientDemographicModel">patientDemographicModel of the selected patient whose case details need to be fetched</param>
        /// <returns>Response with matched patients object</returns>
        [HttpPost]
        public IHttpActionResult GetPatientList([FromBody]PatientSearchFilterModel patientSearchFilterModel)
        {
            
            try
            {
                Expression inputProperty, propertyValue, lambdaExpressionForInputProperty, patientDemographics;
                Expression combinedExpressionForInput = null, combinedExpressionForHID = null, finalCombinedExpressionForSearchFilter = null;
                string[] filePath;
                string fileContentOfDirectory;

                // Reading the file directory and its contents
                ReadPatientDataDirectory objReadPatientDataDirectory = new ReadPatientDataDirectory();
                ReadFileAndContent objReadFileAndContent = new ReadFileAndContent(_log);

                objReadPatientDataDirectory.DataPath = ConfigurationManager.AppSettings["DataPath"].ToString() + "\\" + LocaleUtil.UserLocale + "\\PatientData\\";

                //Reading the data files from DataPath and converting it into array
                filePath = objReadFileAndContent.getFilesFromDirectory(objReadPatientDataDirectory.DataPath);
                fileContentOfDirectory = objReadFileAndContent.fetchPatientFileContent(filePath, ".json");
                fileContentOfDirectory = "[" + fileContentOfDirectory + "]";

                IEnumerable<PatientModel> patientList = JsonConvert.DeserializeObject<IEnumerable<PatientModel>>(fileContentOfDirectory);

                Type patientModelType = typeof(PatientModel);
                Type demographicModelType = typeof(DemographicModel);
                var patientDemographicsType = patientModelType.GetProperties().Where(prop => prop.Name == "PatientDemographics").FirstOrDefault();
                var patient = Expression.Parameter(patientModelType, "patient");
                patientDemographics = Expression.Property(patient, patientDemographicsType);
                var patientDemographicModelType = patientSearchFilterModel.GetType();

                // Building the lambda expression of input fields for the LINQ query
                foreach (PropertyInfo propertyInfo in patientDemographicModelType.GetProperties())
                {
                    if ((propertyInfo.GetValue(patientSearchFilterModel) != null) && (propertyInfo.PropertyType == typeof(string)) || (propertyInfo.PropertyType == typeof(DateTime)))
                    {
                        inputProperty = Expression.Property(patientDemographics, demographicModelType.GetProperties().Where(prop => prop.Name == propertyInfo.Name).FirstOrDefault());

                        propertyValue = Expression.Constant(propertyInfo.GetValue(patientSearchFilterModel));

                        lambdaExpressionForInputProperty = Expression.Equal(inputProperty, propertyValue);

                        combinedExpressionForInput = (combinedExpressionForInput == null) ? lambdaExpressionForInputProperty : Expression.AndAlso(combinedExpressionForInput, lambdaExpressionForInputProperty);
                    }
                }

                // Building the lambda expression of Hospital Code for the LINQ query
                foreach (string HID in patientSearchFilterModel.HospitalCode)
                {
                    inputProperty = Expression.Property(patientDemographics, demographicModelType.GetProperties().Where(prop => prop.Name == "HospitalCode").FirstOrDefault());

                    propertyValue = Expression.Constant(HID);

                    lambdaExpressionForInputProperty = Expression.Equal(inputProperty, propertyValue);

                    combinedExpressionForHID = (combinedExpressionForHID == null) ? lambdaExpressionForInputProperty : Expression.Or(combinedExpressionForHID, lambdaExpressionForInputProperty);
                }

                finalCombinedExpressionForSearchFilter = Expression.AndAlso(combinedExpressionForHID, combinedExpressionForInput);
                var patientListLambdaExpression = Expression.Lambda<Func<PatientModel, bool>>(finalCombinedExpressionForSearchFilter, patient);
                var matchedPatients = patientList.AsQueryable().Where(patientListLambdaExpression).Select(p => p.PatientDemographics);
                return Ok(matchedPatients);
            }
            catch (Exception exp)
            {
                _log.Error(exp.Message.ToString());
                return Content(HttpStatusCode.BadRequest, exp.Message.ToString());
            }
        }
    }
}