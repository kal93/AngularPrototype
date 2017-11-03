using System;
using System.Configuration;

namespace PatientInquiryLogger
{
    /// <summary>
    /// Logger appender configuration model class
    /// </summary>
    public class LoggerAppenderConfigurtionModel
    {
        //Private members
        private bool isAppendToFile = true;
        private string maximumFileSize = "10MB";
        private string datePattern = "'_'yyyy-MM-dd'.log'";
        private string conversionPattern = "%date [%thread] %-5level %logger - %message%newline";
        private int rollingStyle = 3;
        private int maxSizeRollBackups = 5;
        private bool isImmediateFlush = true;
        private bool isStaticLogFileName = false;
        
        /// <summary>
        /// Boolean to denote the appending to the file.
        /// </summary>
        public bool AppendToFile
        {
            get
            {
                try
                {
                    isAppendToFile = ConfigurationManager.AppSettings["LoggerAppendToFile"].ToString().Equals("0") ? false : true;
                }
                catch (Exception)
                {
                }
                return isAppendToFile;
            }
        }

        /// <summary>
        /// Represents the maximum file size
        /// </summary>
        public string MaximumFileSize
        {
            get
            {
                if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["LoggerMaximumFileSize"]))
                {
                    maximumFileSize = ConfigurationManager.AppSettings["LoggerMaximumFileSize"];
                }
                return maximumFileSize;
            }
        }

        /// <summary>
        /// Rpresents the date pattern
        /// </summary>
        public string DatePattern
        {
            get
            {
                if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["LoggerDatePattern"]))
                {
                    datePattern = ConfigurationManager.AppSettings["LoggerDatePattern"];
                }
                return datePattern;
            }
        }

        /// <summary>
        ///Represents the conversion pattern 
        /// </summary>
        public string ConversionPattern
        {
            get
            {
                if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["LoggerConversionPattern"]))
                {
                    conversionPattern = ConfigurationManager.AppSettings["LoggerConversionPattern"];
                }
                return conversionPattern;
            }
        }

        /// <summary>
        /// Boolean to check if the LoggerImmediateFlush is "0"
        /// </summary>
        public bool ImmediateFlush
        {
            get
            {
                try
                {
                    isImmediateFlush = ConfigurationManager.AppSettings["LoggerImmediateFlush"].ToString().Equals("0") ? false : true;
                }
                catch (Exception)
                {
                }
                return isImmediateFlush;
            }
        }

        /// <summary>
        /// Boolean to check if the static log file name is "0"
        /// </summary>
        public bool StaticLogFileName
        {
            get
            {
                try
                {
                    isStaticLogFileName = ConfigurationManager.AppSettings["LoggerStaticLogFileName"].ToString().Equals("0") ? false : true;
                }
                catch (Exception)
                {
                }
                return isStaticLogFileName;
            }
        }

        /// <summary>
        /// Represents the rolling style
        /// </summary>
        public int RollingStyle
        {
            get
            {
                if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["LoggerRollingStyle"]))
                {
                    string strRollingStyle = ConfigurationManager.AppSettings["LoggerRollingStyle"];
                    if (!Int32.TryParse(strRollingStyle, out rollingStyle))
                    {
                        rollingStyle = 3;
                    }
                }
                return rollingStyle;
            }
        }

        /// <summary>
        /// Represents the maximum size of rolling backups
        /// </summary>
        public int MaxSizeRollBackups
        {
            get
            {
                if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["LoggerMaxSizeRollBackups"]))
                {
                    string strMaxSizeRollBackups = ConfigurationManager.AppSettings["LoggerMaxSizeRollBackups"];
                    if (!Int32.TryParse(strMaxSizeRollBackups, out maxSizeRollBackups))
                    {
                        maxSizeRollBackups = 5;
                    }
                }
                return maxSizeRollBackups;
            }
        }
    }
}
