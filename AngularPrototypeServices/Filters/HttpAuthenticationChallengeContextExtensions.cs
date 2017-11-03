using System;
using System.Net.Http.Headers;
using System.Web.Http.Filters;

namespace PatientInquiryServices.Filters
{
    /// <summary>
    /// Class to handle the unauthorized requests
    /// </summary>
    public static class HttpAuthenticationChallengeContextExtensions
    {
        /// <summary>
        /// Verify the schema with context
        /// </summary>
        /// <param name="context">Authentication challenge context for authentication challenge</param>
        /// <param name="scheme">Authentication scheme (bearer) </param>
        public static void ChallengeWith(this HttpAuthenticationChallengeContext context, string scheme)
        {
            ChallengeWith(context, new AuthenticationHeaderValue(scheme));
        }

        /// <summary>
        /// Verify context
        /// </summary>
        /// <param name="context">Authentication challenge context for authentication challenge</param>
        /// <param name="challenge">Authentication information in Authorization, ProxyAuthorization, WWW-Authenticate, and Proxy-Authenticate header values</param>
        public static void ChallengeWith(this HttpAuthenticationChallengeContext context, AuthenticationHeaderValue challenge)
        {
            //Check for context
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }
            // Adding Unauthorized result to header
            context.Result = new AddChallengeOnUnauthorizedResult(challenge, context.Result);
        }
    }
}

