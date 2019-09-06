using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Cheerup2.Models;

namespace Cheerup2.Controllers
{
    public class ScheduleController : Controller
    {
        private ModelNature db = new ModelNature();

        // GET: Schedule
        public ActionResult ScheduleMain()
        {
            //var naturePlaces = db.naturePlaces.ToList();
            return View(db.naturePlaces.ToList());
        }

        // GET: Schedule/ScheduleMain/5
        public ActionResult ScheduleDetial(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            naturePlace naturePlace = db.naturePlaces.Find(id);
            if (naturePlace == null)
            {
                return HttpNotFound();
            }
            return View(naturePlace);
        }
    }
}