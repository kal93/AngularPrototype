using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PatientInquiryServices.Models
{
    /// <summary>
    /// Model that holds Host Information
    /// </summary>
    public class HostInfoModel
    {
        /// <summary>
        /// List of Host Systems that user has access
        /// </summary>
        public List<HostSystem> HostSystems { get; set; }
        /// <summary>
        /// List of Host Roles that user can login with
        /// </summary>
        public List<HostRole> HostRoles { get; set; }
    }
    /// <summary>
    /// Model that holds Host System Information
    /// </summary>
    public class HostSystem
    {
        /// <summary>
        /// Name of Host System
        /// </summary>
        public string Name { get; set; }
    }
    /// <summary>
    /// Model that holds Host Role Information
    /// </summary>
    public class HostRole
    {
        /// <summary>
        /// Host Role Name
        /// </summary>
        public string Role { get; set; }
    }

}