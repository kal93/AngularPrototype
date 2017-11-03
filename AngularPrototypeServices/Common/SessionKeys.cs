namespace PatientInquiryServices.Common
{
    /// <summary>
    /// Class representing names for session keys
    /// </summary>
    public class SessionKeys
    {
        /// <summary>
        /// Current User's name
        /// </summary>
        public const string Username = "LoggedinUserName";
        /// <summary>
        /// Token to use for authenticated user
        /// </summary>
        public const string AuthUserToken = "AuthenticationToken";
        /// <summary>
        /// Current Host System assigned to user
        /// </summary>
        public const string HostSystem = "HostSystem";
        /// <summary>
        /// Current Host role assigned to user
        /// </summary>
        public const string HostRole = "HostRole";
    }
}