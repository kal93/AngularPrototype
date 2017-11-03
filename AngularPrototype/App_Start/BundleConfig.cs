using System;
using System.Web;
using System.Web.Optimization;

namespace PatientInquiryPrototype
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            RegisterStyleBundles();
            RegisterNgBundles();
        }

        private static void RegisterStyleBundles()
        {
            var styleBundles = new StyleBundle("~/Content/css")
                .Include("~/node_modules/@angular/material/prebuilt-themes/indigo-pink.css")
                .Include("~/Content/font-awesome.css")
                //ag-Grid references
                .Include("~/node_modules/ag-grid/dist/styles/ag-grid.css")
                .Include("~/node_modules/ag-grid/dist/styles/theme-bootstrap.css")
                .Include("~/node_modules/ag-grid/dist/styles/theme-blue.css")
                .Include("~/node_modules/ag-grid/dist/styles/theme-material.css")
                .Include("~/node_modules/ag-grid/dist/styles/theme-fresh.css")
                //Common style sheet for Patient Inquiry App
                .Include("~/Content/site.css");
            BundleTable.Bundles.Add(styleBundles);
        }

        private static void RegisterNgBundles()
        {
            var ngBundles = new ScriptBundle("~/scripts/ng")

                //package for jQuery
                .Include("~/node_modules/jquery/dist/jquery.js")
                //Polyfill(s) for older browsers 
                .Include("~/node_modules/core-js/client/shim.min.js")
                .Include("~/node_modules/zone.js/dist/zone.js")
                .Include("~/node_modules/systemjs/dist/system.src.js")
                //Configure SystemJS
                .Include("~/systemjs.config.js");
                
            BundleTable.Bundles.Add(ngBundles);
        }
    }
}
