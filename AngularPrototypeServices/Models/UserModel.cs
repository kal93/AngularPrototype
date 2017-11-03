using System.ComponentModel.DataAnnotations;

namespace PatientInquiryServices.Models
{
    /// <summary>
    /// Model that holds User details
    /// </summary>
    public class UserModel
    {
        /// <summary>
        /// Id of User
        /// </summary>
        public int UserId { get; set; }
        /// <summary>
        /// Name of user
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Username provided by user
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// Description about user
        /// </summary>
        public string UserDescription { get; set; }
        /// <summary>
        /// Host system to which user belongs to
        /// </summary>
        public string HostSystem { get; set; }
        /// <summary>
        /// Host role of user
        /// </summary>
        public string HostRole { get; set; }
        /// <summary>
        /// Permissions provided for user
        /// </summary>
        public string Permissions { get; set; }
        /// <summary>
        /// password for username
        /// </summary>
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

    /// <summary>
    /// Model that holds Authentication response 
    /// </summary>
    public class AuthenticationResponse
    {
        /// <summary>
        /// Authentication token 
        /// </summary>
        public string token { get; set; }
        /// <summary>
        /// Error message 
        /// </summary>
        public string error { get; set; }
        /// <summary>
        /// Permissions provided for user
        /// </summary>
        public string Permissions { get; set; }
    }

}