using log4net;
using log4net.Config;
using System;
using System.Diagnostics;
using System.Reflection;

namespace PatientInquiryLogger
{
    /// <summary>
    /// Logger class
    /// </summary>
    public class Logger : ILog
    {
        //Private members
        private const string LOGNAME = "LogName";
        private string ROOTFILENAME;
        private string LOGFILEPATH;
        private log4net.ILog log;

        LoggerConfigurationModel objLoggerConfigurationModel = new LoggerConfigurationModel();

        static readonly object _locker = new object();
        
        /// <summary>
        /// Logger constructor
        /// </summary>
        public Logger()
        {
            log = LogManager.GetLogger(objLoggerConfigurationModel.LoggerName);

            if (!log.Logger.Repository.Configured)
            {
                XmlConfigurator.Configure();
                SetupLogLevelMap();
            }
            SetupDefaultLogAppender();
        }
        /// <summary>
        /// Method to setup log level map
        /// </summary>
        private void SetupLogLevelMap()
        {
            try
            {
                log4net.Repository.Hierarchy.Logger objLogger = (log4net.Repository.Hierarchy.Logger)log.Logger;
                objLogger.Level = objLogger.Hierarchy.LevelMap[objLoggerConfigurationModel.LogLevelMap];
            }
            catch (Exception ex)
            {
                Error("Exception Occured in SetupLogLevelMap" + ex.InnerException);
            }
        }
        /// <summary>
        /// Method to setup default log appender
        /// </summary>
        private void SetupDefaultLogAppender()
        {
            try
            {
                ROOTFILENAME = objLoggerConfigurationModel.LogFileName;
                LOGFILEPATH = objLoggerConfigurationModel.LogFilePath;

                string strRootFileFullPath = String.Format("{0}{1}", LOGFILEPATH, ROOTFILENAME);
                lock (_locker)
                {
                    ILog4NetFileAppenderWrapper objILog4NetFileAppenderWrapper = new Log4NetFileAppenderWrapper();
                    bool setupDefaultLogAppenderSucess = objILog4NetFileAppenderWrapper.SetupFileAppender(strRootFileFullPath, ROOTFILENAME);

                    if (!setupDefaultLogAppenderSucess)  // As it is performing at constructor level, logging the error message
                    {
                        Error("Issue in Setting up Default Log Appender for Root Log File");
                    }
                }
            }
            catch (Exception ex)
            {
                Error("Exception Occured in SetupDefaultLogAppender" + ex.InnerException);
            }

        }
        /// <summary>
        /// This method sets up  the log appender
        /// </summary>
        /// <param name="strFileName">File name of the log file</param>
        /// <returns>Boolean to denote setting up of log appender </returns>
        public bool SetupLogAppender(string strFileName)
        {
            bool setupLogAppenderSucess = false;
            try
            {

                string strLogFileFullPath = String.Format("{0}{1}", LOGFILEPATH, strFileName);
                lock (_locker)
                {
                    ILog4NetFileAppenderWrapper objILog4NetFileAppenderWrapper = new Log4NetFileAppenderWrapper();
                    setupLogAppenderSucess = objILog4NetFileAppenderWrapper.SetupFileAppender(strLogFileFullPath, strFileName);
                }
            }
            catch (Exception ex)
            {
                Error("Exception Occured in SetupLogAppender" + ex.InnerException);
            }

            return setupLogAppenderSucess;
        }
       /// <summary>
       /// Property to check if debug is enabled
       /// </summary>
        public bool IsDebugEnabled
        {
            get { return log.IsDebugEnabled; }
        }
        /// <summary>
        /// Property to check if Trace is enabled
        /// </summary>
        public bool IsTraceEnabled
        {
            get { return log.IsDebugEnabled; }
        }
        /// <summary>
        /// Property to check if Error is enabled
        /// </summary>
        public bool IsErrorEnabled
        {
            get { return log.IsErrorEnabled; }
        }
        /// <summary>
        /// Property to check if Fatal is enabled
        /// </summary>
        public bool IsFatalEnabled
        {
            get { return log.IsFatalEnabled; }
        }
        /// <summary>
        /// Property to check if Info is enabled
        /// </summary>
        public bool IsInfoEnabled
        {
            get { return log.IsInfoEnabled; }
        }
        /// <summary>
        /// Property to check if Warning is enabled
        /// </summary>
        public bool IsWarnEnabled
        {
            get { return log.IsWarnEnabled; }
        }
        /// <summary>
        /// This method is to debug
        /// </summary>
        /// <param name="message">Debug message</param>
        /// <param name="exception">Exception that is occured</param>
        /// <param name="strFileName">Logger file name</param>
        public void Debug(object message, Exception exception, string strFileName = null)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.Debug(GetLogSource() + message, exception);
            }
        }
        /// <summary>
        /// This method debugs the logger
        /// </summary>
        /// <param name="message">message text</param>
        /// <param name="strFileName">File name of the logger</param>
        public void Debug(object message, string strFileName = null)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.Debug(GetLogSource() + message);
            }
        }
        /// <summary>
        /// Represents the debug format
        /// </summary>
        /// <param name="formatProvider">provides the format</param>
        /// <param name="format">format</param>
        /// <param name="exception">exception</param>
        /// <param name="strFileName">logger file name</param>
        /// <param name="args">arguments</param>
        public void DebugFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.DebugFormat(formatProvider, format, exception, args);
            }

        }
        /// <summary>
        /// Represents the debug format
        /// </summary>
        /// <param name="formatProvider">provides the format</param>
        /// <param name="format">format</param>
        /// <param name="strFileName">logger file name</param>
        /// <param name="args">arguments</param>
        public void DebugFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.DebugFormat(formatProvider, format, args);
            }

        }
        /// <summary>
        /// Represents the debug format
        /// </summary>
        /// <param name="format">format</param>
        /// <param name="exception">exception format</param>
        /// <param name="strFileName">logger file name</param>
        /// <param name="args">arguments</param>
        public void DebugFormat(string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.DebugFormat(format, exception, args);
            }

        }
        /// <summary>
        /// Represents the debug format
        /// </summary>
        /// <param name="format">format</param>
        /// <param name="strFileName">logger file name</param>
        /// <param name="args">arguments</param>
        public void DebugFormat(string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.DebugFormat(format, args);
            }
        }
        /// <summary>
        /// Represents the error
        /// </summary>
        /// <param name="message">error message</param>
        /// <param name="exception">exception</param>
        /// <param name="strFileName">Logger file name</param>
        public void Error(object message, Exception exception, string strFileName = null)
        {

            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsErrorEnabled)
                    log.Error(GetLogSource() + message, exception);
            }

        }
        /// <summary>
        /// Represents the error
        /// </summary>
        /// <param name="message">error message</param>
        /// <param name="strFileName">Logger file name</param>
        public void Error(object message, string strFileName = null)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsErrorEnabled)
                    log.Error(GetLogSource() + message);
            }

        }
        /// <summary>
        /// Error format
        /// </summary>
        /// <param name="formatProvider">Provider of the error format</param>
        /// <param name="format">error format</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void ErrorFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsErrorEnabled)
                    log.ErrorFormat(formatProvider, format, exception, args);
            }

        }
        /// <summary>
        /// Error format
        /// </summary>
        /// <param name="formatProvider">Provider of the error format</param>
        /// <param name="format">error format</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void ErrorFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsErrorEnabled)
                    log.ErrorFormat(formatProvider, format, args);
            }

        }
        /// <summary>
        /// Error format
        /// </summary>
        /// <param name="format">error format</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void ErrorFormat(string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsErrorEnabled)
                    log.ErrorFormat(format, exception, args);
            }

        }
        /// <summary>
        /// Error format
        /// </summary>
        /// <param name="format">error format</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void ErrorFormat(string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsErrorEnabled)
                    log.ErrorFormat(format, args);
            }

        }
        /// <summary>
        /// Fatal error
        /// </summary>
        /// <param name="message">error message</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        public void Fatal(object message, Exception exception, string strFileName = null)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsFatalEnabled)
                    log.Fatal(GetLogSource() + message, exception);
            }
        }
        /// <summary>
        /// Fatal error
        /// </summary>
        /// <param name="message">Fatal messeage</param>
        /// <param name="strFileName">Logger file name</param>
        public void Fatal(object message, string strFileName = null)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsFatalEnabled)
                    log.Fatal(GetLogSource() + message);
            }
        }
        /// <summary>
        /// Fatal format
        /// </summary>
        /// <param name="formatProvider">Provider of the fatal format</param>
        /// <param name="format">fatal format</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void FatalFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsFatalEnabled)
                    log.FatalFormat(formatProvider, format, exception, args);
            }

        }
        /// <summary>
        /// Fatal format
        /// </summary>
        /// <param name="formatProvider">Provider of the fatal format</param>
        /// <param name="format">fatal format</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void FatalFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsFatalEnabled)
                    log.FatalFormat(formatProvider, format, args);
            }


        }
        /// <summary>
        /// Fatal format
        /// </summary>
        /// <param name="format">fatal format</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void FatalFormat(string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsFatalEnabled)
                    log.FatalFormat(format, exception, args);
            }

        }
        /// <summary>
        /// Fatal format
        /// </summary>
        /// <param name="format">fatal format</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void FatalFormat(string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsFatalEnabled)
                    log.FatalFormat(format, args);
            }

        }
        /// <summary>
        /// Info level log
        /// </summary>
        /// <param name="message">error message</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        public void Info(object message, Exception exception, string strFileName = null)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsInfoEnabled)
                    log.Info(GetLogSource() + message, exception);
            }

        }
        /// <summary>
        /// Info level log
        /// </summary>
        /// <param name="message">error message</param>
        /// <param name="strFileName">Logger file name</param>
        public void Info(object message, string strFileName = null)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsInfoEnabled)
                    log.Info(GetLogSource() + message);
            }

        }
        /// <summary>
        /// Info level log format
        /// </summary>
        /// <param name="formatProvider">Provider of the info format</param>
        /// <param name="format">info format</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void InfoFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsInfoEnabled)
                    log.InfoFormat(formatProvider, format, exception, args);
            }


        }
        /// <summary>
        /// Info level log format
        /// </summary>
        /// <param name="formatProvider">Provider of the info format</param>
        /// <param name="format">info format</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void InfoFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsInfoEnabled)
                    log.InfoFormat(formatProvider, format, args);
            }

        }
        /// <summary>
        /// Info level log format
        /// </summary>
        /// <param name="format">info format</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void InfoFormat(string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsInfoEnabled)
                    log.InfoFormat(format, exception, args);
            }

        }
        /// <summary>
        /// Info level log format
        /// </summary>
        /// <param name="format">info format</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void InfoFormat(string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsInfoEnabled)
                    log.InfoFormat(format, args);
            }


        }
        /// <summary>
        /// Trace level log
        /// </summary>
        /// <param name="message">message info</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        public void Trace(object message, Exception exception, string strFileName = null)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.Debug(GetLogSource() + message, exception);
            }

        }
        /// <summary>
        /// Trace level log
        /// </summary>
        /// <param name="message">message info</param>
        /// <param name="strFileName">Logger file name</param>
        public void Trace(object message, string strFileName = null)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.Debug(GetLogSource() + message);
            }

        }
        /// <summary>
        /// Trace level log format
        /// </summary>
        /// <param name="formatProvider">Trace level format provider</param>
        /// <param name="format">trace format</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void TraceFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.DebugFormat(formatProvider, format, exception, args);
            }

        }
        /// <summary>
        /// Trace level log format
        /// </summary>
        /// <param name="formatProvider">Trace level format provider</param>
        /// <param name="format">trace format</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void TraceFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.DebugFormat(formatProvider, format, args);
            }

        }
        /// <summary>
        /// Trace level log format
        /// </summary>
        /// <param name="format">trace format</param>
        /// <param name="exception">exception message</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void TraceFormat(string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.DebugFormat(format, exception, args);
            }

        }
        /// <summary>
        /// Trace level log format
        /// </summary>
        /// <param name="format">trace format</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void TraceFormat(string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsDebugEnabled)
                    log.DebugFormat(format, args);
            }

        }
        /// <summary>
        /// Warning level log
        /// </summary>
        /// <param name="message">message string</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        public void Warn(object message, Exception exception, string strFileName = null)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsWarnEnabled)
                    log.Warn(GetLogSource() + message, exception);
            }

        }
        /// <summary>
        /// Warning level log
        /// </summary>
        /// <param name="message">message string</param>
        /// <param name="strFileName">Logger file name</param>
        public void Warn(object message, string strFileName = null)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsWarnEnabled)
                    log.Warn(GetLogSource() + message);
            }

        }
        /// <summary>
        /// Warning level log
        /// </summary>
        /// <param name="formatProvider">Warning level format provider</param>
        /// <param name="format">Warning format</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void WarnFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsWarnEnabled)
                    log.WarnFormat(formatProvider, format, exception, args);
            }

        }
        /// <summary>
        /// Warning level log
        /// </summary>
        /// <param name="formatProvider">Warning level format provider</param>
        /// <param name="format">Warning format</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void WarnFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsWarnEnabled)
                    log.WarnFormat(formatProvider, format, args);
            }

        }
        /// <summary>
        /// Warning level log format
        /// </summary>
        /// <param name="format">Warning format</param>
        /// <param name="exception">exception name</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void WarnFormat(string format, Exception exception, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsWarnEnabled)
                    log.WarnFormat(format, exception, args);
            }

        }
        /// <summary>
        /// Warning level log format
        /// </summary>
        /// <param name="format">Warning format</param>
        /// <param name="strFileName">Logger file name</param>
        /// <param name="args">arguments</param>
        public void WarnFormat(string format, string strFileName = null, params object[] args)
        {
            lock (_locker)
            {
                log4net.ThreadContext.Properties[LOGNAME] = strFileName ?? ROOTFILENAME;

                if (log.IsWarnEnabled)
                    log.WarnFormat(format, args);
            }

        }


        private string GetLogSource()
        {
            string message;
            StackTrace stackTrace = new StackTrace();
            StackFrame[] stackFrames = stackTrace.GetFrames();

            StackFrame callingFrame = stackFrames[2];
            MethodBase method = callingFrame.GetMethod();
            var methodname = method.Name;
            var classname = method.DeclaringType.Name;

            message = (classname + " : " + methodname + " - ");
            return message;
        }

    }
}

