using System.Configuration;

namespace PatientInquiryLogger
{
    /// <summary>
    /// Logger configuration model class
    /// </summary>
    public class LoggerConfigurationModel
    {
        //Private members
        private string loggerName = "Patient Inquiry Logger";
        private string logFilePath = "";
        private string logLevelMap = "ALL";
        private string logMainFileName = "RootFile";
        /// <summary>
        /// Represents the logger name
        /// </summary>
        public string LoggerName
        {
            get
            {
                if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["LoggerName"]))
                {
                    loggerName = ConfigurationManager.AppSettings["LoggerName"];
                }
                return loggerName;
            }
        }
        /// <summary>
        /// Represents the logger file path
        /// </summary>
        public string LogFilePath
        {
            get
            {
                if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["LoggerFilePath"]))
                {
                    logFilePath = ConfigurationManager.AppSettings["LoggerFilePath"];
                    if (!logFilePath.EndsWith("\\"))
                    {
                        logFilePath += "\\";
                    }
                }
                return logFilePath;
            }
        }
        /// <summary>
        /// Represents the logger level map
        /// </summary>
        public string LogLevelMap
        {
            get
            {
                if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["LoggerLevel"]))
                {
                    logLevelMap = ConfigurationManager.AppSettings["LoggerLevel"];
                }
                return logLevelMap;
            }
        }
        /// <summary>
        /// Represents the logger file name
        /// </summary>
        public string LogFileName
        {
            get
            {
                if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["LogFileName"]))
                {
                    logMainFileName = ConfigurationManager.AppSettings["LogFileName"];
                }
                return logMainFileName;
            }
        }
    }
}
