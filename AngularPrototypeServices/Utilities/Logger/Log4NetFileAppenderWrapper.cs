using log4net.Appender;
using System;

namespace PatientInquiryLogger
{
    public class Log4NetFileAppenderWrapper : ILog4NetFileAppenderWrapper
    {
        //Private members
        private const string LOGNAME = "LogName";

        private LoggerAppenderConfigurtionModel objLoggerConfigurtionModel = new LoggerAppenderConfigurtionModel();
        /// <summary>
        /// This method is to setup file appender
        /// </summary>
        /// <param name="strLogPath">Logger path</param>
        /// <param name="strFileName">File name</param>
        /// <returns></returns>
        public bool SetupFileAppender(string strLogPath, string strFileName)
        {
            bool setupFileAppenderSuccess = true;
            IAppender objAppender = null;
            try
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName;
                objAppender = CreateFileAppender(strLogPath, strFileName);
                AddAppender(strFileName, objAppender);
            }
            catch (Exception)
            {
                setupFileAppenderSuccess = false;
            }
            return setupFileAppenderSuccess;
        }

        private void AddAppender(string strLoggerName, IAppender appender)
        {
            log4net.ILog log = log4net.LogManager.GetLogger(strLoggerName);
            log4net.Repository.Hierarchy.Logger objLogger = (log4net.Repository.Hierarchy.Logger)log.Logger;

            if (!objLogger.Appenders.Contains(appender))
            {
                objLogger.AddAppender(appender);
            }
        }

        private IAppender FindAppender(string strAppenderName)
        {
            foreach (IAppender appender in log4net.LogManager.GetRepository().GetAppenders())
            {
                if (appender.Name == strAppenderName)
                    return appender;
            }
            return null;
        }

        private IAppender CreateFileAppender(string strLogPath, string strFileName)
        {
            RollingFileAppender appender = (RollingFileAppender)FindAppender(strFileName);

            if (appender != null)
                return appender;


            appender = new RollingFileAppender();
            appender.Name = strFileName;
            appender.File = strLogPath;
            appender.AppendToFile = objLoggerConfigurtionModel.AppendToFile;
            appender.MaximumFileSize = objLoggerConfigurtionModel.MaximumFileSize;
            appender.DatePattern = objLoggerConfigurtionModel.DatePattern;
            appender.MaxSizeRollBackups = objLoggerConfigurtionModel.MaxSizeRollBackups;

            switch (objLoggerConfigurtionModel.RollingStyle)
            {
                case 0:
                    appender.RollingStyle = RollingFileAppender.RollingMode.Once;
                    break;
                case 1:
                    appender.RollingStyle = RollingFileAppender.RollingMode.Size;
                    break;
                case 2:
                    appender.RollingStyle = RollingFileAppender.RollingMode.Date;
                    break;
                case 3:
                    appender.RollingStyle = RollingFileAppender.RollingMode.Composite;
                    break;
            }

            appender.StaticLogFileName = objLoggerConfigurtionModel.StaticLogFileName;
            appender.ImmediateFlush = objLoggerConfigurtionModel.ImmediateFlush;

            //// add the filter for the log source
            log4net.Filter.PropertyFilter filter = new log4net.Filter.PropertyFilter();

            filter.Key = LOGNAME;
            filter.StringToMatch = strFileName;
            filter.AcceptOnMatch = true;

            //add deny all filter
            log4net.Filter.DenyAllFilter filterDeny = new log4net.Filter.DenyAllFilter();

            appender.AddFilter(filter);
            appender.AddFilter(filterDeny);

            log4net.Layout.PatternLayout layout = new log4net.Layout.PatternLayout();
            layout.ConversionPattern = objLoggerConfigurtionModel.ConversionPattern;
            layout.ActivateOptions();

            appender.Layout = layout;
            appender.ActivateOptions();
            log4net.Config.BasicConfigurator.Configure(appender);
            return appender;
        }
    }
}
