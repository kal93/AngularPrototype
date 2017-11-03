using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace PatientInquiryServices.Filters
{
    /// <summary>
    /// Class for handling unauthorized result - inherits from IHttpActionResult
    /// </summary>
    public class AddChallengeOnUnauthorizedResult : IHttpActionResult
    {
        /// <summary>
        /// Challenge for UnauthorizedResult
        /// </summary>
        /// <param name="challenge">Authentication information in Authorization, ProxyAuthorization, WWW-Authenticate, and Proxy-Authenticate header values</param>
        /// <param name="innerResult">response message for unauthorized response</param>
        public AddChallengeOnUnauthorizedResult(AuthenticationHeaderValue challenge, IHttpActionResult innerResult)
        {
            Challenge = challenge;
            InnerResult = innerResult;
        }

        /// <summary>
        /// Authentication information in Authorization, ProxyAuthorization, WWW-Authenticate, and Proxy-Authenticate header values
        /// </summary>
        public AuthenticationHeaderValue Challenge { get; }

        /// <summary>
        /// response message for unauthorized response
        /// </summary>
        public IHttpActionResult InnerResult { get; }

        /// <summary>
        /// returning state to the response header (ex OK (201) or failure (401))
        /// </summary>
        /// <param name="cancellationToken">Token to send notification that operations should be canceled</param>
        /// <returns>response</returns>
        public async Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = await InnerResult.ExecuteAsync(cancellationToken);

            if (response.StatusCode == HttpStatusCode.Unauthorized)
            {
                // adding authentication message to header.
                if (response.Headers.WwwAuthenticate.All(h => h.Scheme != Challenge.Scheme))
                {
                    response.Headers.WwwAuthenticate.Add(Challenge);
                }
            }
            return response;
        }
    }
}
