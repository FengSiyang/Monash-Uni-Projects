using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Net;
using Cheerup2.Models;

namespace Cheerup2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        public ActionResult medicalHelp()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult FunTime()
        {
            ViewBag.Message = "Your FunTime page.";

            return View();
        }


        //New template integration
        public ActionResult newHome()
        {
            ViewBag.Message = "Your newHome page.";

            return View();
        }
        public ActionResult Know()
        {
            ViewBag.Message = "Your sports page.";

            return View();
        }
        public ActionResult Service()
        {
            ViewBag.Message = "Your seivice page.";

            return View();
        }
        public ActionResult Nature()
        {
            ViewBag.Message = "Your gallery page.";

            return View();
        }
        public ActionResult Sports()
        {
            ViewBag.Message = "Your gallery page.";

            return View();
        }
        public ActionResult PicDetail()
        {
            ViewBag.Message = "Your gallery page.";

            return View();
        }
    }
}