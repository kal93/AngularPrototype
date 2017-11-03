using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace PatientInquiryServices.Filters
{
    /// <summary>
    /// Class to handle authentication failure result
    /// </summary>
    public class AuthenticationFailureResult : IHttpActionResult
    {
        /// <summary>
        /// Adding failure message to context
        /// </summary>
        /// <param name="reasonPhrase">Authentication failure message</param>
        /// <param name="request">Http Request</param>
        public AuthenticationFailureResult(string reasonPhrase, HttpRequestMessage request)
        {
            ReasonPhrase = reasonPhrase;
            Request = request;
        }
        /// <summary>
        /// Authentication failure message 
        /// </summary>
        public string ReasonPhrase { get; }

        /// <summary>
        /// Http Request
        /// </summary>
        public HttpRequestMessage Request { get; }
        /// <summary>
        /// Task to create HttpResponseMessage asynchronously
        /// </summary>
        /// <param name="cancellationToken">Token to send notification that operations should be canceled</param>
        /// <returns>task which creates response messages</returns>
        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(Execute());
        }
        /// <summary>
        /// Adding Unauthorized (401) code to response
        /// </summary>
        /// <returns></returns>
        private HttpResponseMessage Execute()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.Unauthorized)
            {
                RequestMessage = Request,
                ReasonPhrase = ReasonPhrase
            };

            return response;
        }
    }
}
