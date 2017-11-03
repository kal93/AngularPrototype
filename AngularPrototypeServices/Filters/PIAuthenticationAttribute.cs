using PatientInquiryServices.Jwt;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;
using PatientInquiryServices.Common;

namespace PatientInquiryServices.Filters
{
    /// <summary>
    /// Authentication custom filter 
    /// </summary>
    public class PIAuthenticationAttribute : Attribute, IAuthenticationFilter
    {
        public bool AllowMultiple => false;
        /// <summary>
        /// Core Authentication logic (Method from IAuthenticationFilter interface)
        /// AuthenticateAsync contains the core authentication logic. If authentication is successful, context.Prinicipal is set. Otherwise, context.ErrorResult is set to specific error
        /// </summary>
        /// <param name="context">Authentication challenge context for authentication challenge</param>
        /// <param name="cancellationToken">Token to send notification that operations should be canceled</param>
        /// <returns>Returns an object with the results of the authentication</returns>
        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;
            //Check for authorization and type of schema 
            if (authorization == null || authorization.Scheme != "Bearer")
            {
                context.ErrorResult = new AuthenticationFailureResult("Invalid token", request);
                return;
            }
            if (string.IsNullOrEmpty(authorization.Parameter))
            {
                context.ErrorResult = new AuthenticationFailureResult("Missing Jwt Token", request);
                return;
            }

            var token = authorization.Parameter;
            //Finding the principal from token
            var principal = await AuthenticateJwtToken(token);

            if (principal == null)
                context.ErrorResult = new AuthenticationFailureResult("Invalid token", request);

            else
                context.Principal = principal;
        }

        /// <summary>
        /// Token Validation 
        /// </summary>
        /// <param name="token">Authentication token</param>
        /// <param name="username">Logged-in username</param>
        /// <returns>true or false</returns>
        private static bool ValidateToken(string token, out string username)
        {
            username = null;
            var simplePrinciple = JwtManager.GetPrincipal(token);
            var identity = simplePrinciple.Identity as ClaimsIdentity;

            if (identity == null)
                return false;

            if (!identity.IsAuthenticated)
                return false;

            var usernameClaim = identity.FindFirst(ClaimTypes.Name);
            username = usernameClaim?.Value;
            //Verifying Authentication token received from Client with server Session token 
            if (string.IsNullOrEmpty(username) || (Convert.ToString(SessionHelper.GetFromSession(SessionKeys.AuthUserToken)) != token))
                return false;

            return true;
        }

        /// <summary>
        /// Authenticating token
        /// </summary>
        /// <param name="token">Authentication Token</param>
        /// <returns>Principal</returns>
        protected Task<IPrincipal> AuthenticateJwtToken(string token)
        {
            string username;
            //Check to validate the token
            if (ValidateToken(token, out username))
            {
                // based on username to get more information from database in order to build local identity
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, username)
                };

                var identity = new ClaimsIdentity(claims, "Jwt");
                IPrincipal user = new ClaimsPrincipal(identity);

                return Task.FromResult(user);
            }

            return Task.FromResult<IPrincipal>(null);
        }
        /// <summary>
        /// Ass message to header Asynchronously 
        /// </summary>
        /// <param name="context">Authentication challenge context containing information for executing an authentication challenge</param>
        /// <param name="cancellationToken">Token to send notification that operations should be canceled</param>
        /// <returns>task that completes the challenge - To send authenticate header (Example 404) </returns>
        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            Challenge(context);
            return Task.FromResult(0);
        }

        /// <summary>
        /// To challenge the context with the schema
        /// </summary>
        /// <param name="context">Authentication challenge context containing information for executing an authentication challenge</param>
        private void Challenge(HttpAuthenticationChallengeContext context)
        {
            context.ChallengeWith("Bearer");
        }
    }
}

