using System;
using System.IO;
using System.Linq;
using PatientInquiryLogger;

namespace PatientInquiryServices.Utilities
{
    /// <summary>
    /// This class is used to get full path of the file and list of all files in the given directory
    /// Provides content of a given file
    /// </summary>
    public class ReadFileAndContent
    {
        //Private members
        //Logger Instance for logging
        private ILog log;

        public ReadFileAndContent(ILog log)
        {
            this.log = log;
        }
        /// <summary>
        /// This function will fetch file data from the given directory
        /// </summary>
        /// <param name="fileDirectory">Path of the directory from where it will get content</param>
        /// <param name="fileType">It is to specify the file type (Eg .json)</param>
        /// <returns>File content in string format</returns>
        public string fetchPatientFileContent(string[] fileDirectory, string fileType)
        {
            string fetchedDataFile = "";

            try
            {

                var strSpecifiedFile = from item in fileDirectory
                                       where item.Contains(fileType)
                                       select item;

                foreach (var item in strSpecifiedFile)
                {
                    using (FileStream fs = new FileStream(item, FileMode.Open, FileAccess.Read))
                    {
                        fetchedDataFile = fetchedDataFile + (new StreamReader(fs)).ReadToEnd() + ",";
                    }
                }
            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
            }
            return fetchedDataFile.TrimEnd(',');
        }

        /// <summary>
        /// This function will list of files from the given directory
        /// </summary>
        /// <param name="fileDirectory">Path of the directory from where it will get list of files</param>
        /// <returns>Array of files with complete path</returns>
        public string[] getFilesFromDirectory(string fileDirectory)
        {
            string[] filePath = null;
            try
            {
                filePath = Directory.GetFiles(fileDirectory);
            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
            }
            return filePath;
        }

        /// <summary>
        /// This function reads content of a file
        /// </summary>
        /// <param name="filePath">File path to read content</param>
        /// <returns>Content of file</returns>
        public string readFileContent(string filePath)
        {
            string fileContent = null;
            try
            {
                using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                {
                    fileContent = new StreamReader(fs).ReadToEnd();
                }
            }
            catch (Exception exp)
            {
                log.Error(exp.Message.ToString());
            }
            return fileContent;
        }
        /// <summary>
        /// This method updates the file in the file path
        /// </summary>
        /// <param name="filePath">filepath to write the content</param>
        /// <param name="fileContent">Content to be written to the file</param>
        public void updateFileContent(string filePath, string fileContent)
        {
            using (StreamWriter strUpdateFile = new StreamWriter(filePath))
            {
                strUpdateFile.Write(fileContent);
            }
        }
    }
}