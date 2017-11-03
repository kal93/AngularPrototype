
namespace PatientInquiryLogger
{
    /// <summary>
    /// Interface for log4Net file appender
    /// </summary>
    public interface ILog4NetFileAppenderWrapper
    {
        bool SetupFileAppender(string strLogPath, string strFileName);
    }
}
