using System.Web.Mvc;

namespace HouseSharingWebsite.Controllers
{
    public class AppController : Controller
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }
    }
}
