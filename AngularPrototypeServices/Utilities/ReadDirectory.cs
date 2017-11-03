namespace PatientInquiryServices.Utilities
{
    /// <summary>
    /// It reads dataFiles path from the given path    
    /// </summary>
    public class ReadPatientDataDirectory
    {
        //Private members
        private string dataFilesPath;
       /// <summary>
       /// This property holds the path of the directory in which test data is stored
       /// </summary>
        public string DataPath
        {
            get { return dataFilesPath; }
            set { dataFilesPath = value; }
        }
    }
}