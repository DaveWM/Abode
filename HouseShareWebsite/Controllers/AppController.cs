using System.Web.Mvc;

namespace AbodeWebsite.Controllers
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
