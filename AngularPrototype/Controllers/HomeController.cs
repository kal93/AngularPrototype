using System.Web.Mvc;

namespace PatientInquiryPrototype.Controllers
{
    /// <summary>
    /// It's Home Controller class
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// It's Index action method
        /// By default this action will be executed
        /// </summary>
        public ActionResult Index()
        {
            return View();
        }
    }
}