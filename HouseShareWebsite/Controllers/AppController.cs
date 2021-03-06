﻿using System.Web.Mvc;

namespace AbodeWebsite.Controllers
{
    public class AppController : Controller
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
#if DEBUG
            return View("IndexDebug");
#endif
            return View("index");
        }
    }
}
