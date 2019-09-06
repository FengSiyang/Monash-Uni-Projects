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
    public class naturePlacesController : Controller
    {
        private ModelNature db = new ModelNature();

        // GET: naturePlaces
        public ActionResult Nature()
        {
            return View(db.naturePlaces.ToList());
        }

        // GET: naturePlaces/PicDetial/5
        public ActionResult PicDetail(int? id)
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



        // GET: naturePlaces
        public ActionResult DetailedDisplay()
        {
            return View(db.naturePlaces.ToList().Take(3));
        }


        // GET: naturePlaces
        public ActionResult Index()
        {
            return View(db.naturePlaces.ToList());
        }

        // GET: naturePlaces/Details/5
        public ActionResult Details(int? id)
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

        // GET: naturePlaces/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: naturePlaces/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,placeName,address,imagePicture,url,sportSuggestions,Tag,Detail")] naturePlace naturePlace)
        {
            if (ModelState.IsValid)
            {
                db.naturePlaces.Add(naturePlace);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(naturePlace);
        }

        // GET: naturePlaces/Edit/5
        public ActionResult Edit(int? id)
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

        // POST: naturePlaces/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,placeName,address,imagePicture,url,sportSuggestions,Tag,Detail")] naturePlace naturePlace)
        {
            if (ModelState.IsValid)
            {
                db.Entry(naturePlace).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(naturePlace);
        }

        // GET: naturePlaces/Delete/5
        public ActionResult Delete(int? id)
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

        // POST: naturePlaces/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            naturePlace naturePlace = db.naturePlaces.Find(id);
            db.naturePlaces.Remove(naturePlace);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
