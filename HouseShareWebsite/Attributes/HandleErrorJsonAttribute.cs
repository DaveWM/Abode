using System.Net;
using System.Net.Http;
using System.Security.AccessControl;
using System.Text;
using System.Web.Http;
using System.Web.Http.Filters;

namespace HouseShareWebsite.Attributes
{
    public class HandleErrorJsonAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext filterContext)
        {
            base.OnException(filterContext);
            filterContext.Response = filterContext.Request.CreateResponse(HttpStatusCode.InternalServerError, new
                                                                                                              {
                                                                                                                  message
                                                                                                                      =
                                                                                                                      filterContext
                                                                                                                          .Exception
                                                                                                                          .Message
                                                                                                              });
        }
    }
}