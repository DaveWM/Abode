using System.Web.Optimization;

namespace AbodeWebsite
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/toastr.js",
                "~/Scripts/ajaxEndpoints.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/angular.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-touch.js",
                "~/Scripts/angular-ui/ui-utils.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                "~/Scripts/angular-ui-router.js",
                "~/Scripts/angular-file-upload.js",
                "~/Scripts/bootflat/*.js",
                "~/Scripts/angular-local-storage.js",
                "~/Scripts/angular-breakpoint.js",
                "~/Scripts/jquery.signalR-2.1.1.js",
                "~/Scripts/hammer.js",
                "~/Scripts/angular-hammer.js"));
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Angular/App.js",
                "~/Angular/Controllers/*.js",
                "~/Angular/Filters/*.js",
                "~/Angular/Directives/*.js",
                "~/Angular/Services/*.js"
                ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/*.css",
                "~/Content/bootstrap/bootstrap.css",
                "~/Content/bootflat/css/bootflat.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
