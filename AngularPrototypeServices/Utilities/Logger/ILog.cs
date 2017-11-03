using System;

namespace PatientInquiryLogger
{
    /// <summary>
    /// Interface for Ilog
    /// </summary>
    public interface ILog
    {
        bool SetupLogAppender(string strFileName);

        bool IsTraceEnabled { get; }

        bool IsErrorEnabled { get; }

        bool IsFatalEnabled { get; }

        bool IsInfoEnabled { get; }

        bool IsWarnEnabled { get; }

        void Debug(object message, Exception exception, string strFileName = null);

        void Debug(object message, string strFileName = null);

        void DebugFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args);

        void DebugFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args);

        void DebugFormat(string format, Exception exception, string strFileName = null, params object[] args);

        void DebugFormat(string format, string strFileName = null, params object[] args);

        void Error(object message, Exception exception, string strFileName = null);

        void Error(object message, string strFileName = null);

        void ErrorFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args);

        void ErrorFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args);

        void ErrorFormat(string format, Exception exception, string strFileName = null, params object[] args);

        void ErrorFormat(string format, string strFileName = null, params object[] args);

        void Fatal(object message, Exception exception, string strFileName = null);

        void Fatal(object message, string strFileName = null);

        void FatalFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args);

        void FatalFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args);

        void FatalFormat(string format, Exception exception, string strFileName = null, params object[] args);

        void FatalFormat(string format, string strFileName = null, params object[] args);

        void Info(object message, Exception exception, string strFileName = null);

        void Info(object message, string strFileName = null);

        void InfoFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args);

        void InfoFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args);

        void InfoFormat(string format, Exception exception, string strFileName = null, params object[] args);

        void InfoFormat(string format, string strFileName = null, params object[] args);

        void Trace(object message, Exception exception, string strFileName = null);

        void Trace(object message, string strFileName = null);

        void TraceFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args);

        void TraceFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args);

        void TraceFormat(string format, Exception exception, string strFileName = null, params object[] args);

        void TraceFormat(string format, string strFileName = null, params object[] args);

        void Warn(object message, Exception exception, string strFileName = null);

        void Warn(object message, string strFileName = null);

        void WarnFormat(IFormatProvider formatProvider, string format, Exception exception, string strFileName = null, params object[] args);

        void WarnFormat(IFormatProvider formatProvider, string format, string strFileName = null, params object[] args);

        void WarnFormat(string format, Exception exception, string strFileName = null, params object[] args);

        void WarnFormat(string format, string strFileName = null, params object[] args);

    }
}