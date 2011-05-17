using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;

using TransportModel.Model;
using CommuterWeb.Models;

namespace CommuterWeb.Controllers
{
    public class BingMapController : Controller
    {
        //
        // GET: /BingMap/

        public struct GetLinksViewModel
        {
            public List<LinkViewModel> Links { get; set; }
        }

        public struct LinkViewModel
        {
            public long? Attributes { get; set; }
            public List<Coordinate> Polyline { get; set; }
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetLinks(int? max)
        {
            List<Link> links = RoadNetwork.Instance.NetworkModel.GetAllLinks();
            if (max.HasValue && max <= links.Count)
            {
                links = links.GetRange(0, max.Value);
            }

            GetLinksViewModel vm = new GetLinksViewModel();
            vm.Links = new List<LinkViewModel>();
            foreach (Link l in links)
            {
                LinkViewModel lvm = new LinkViewModel();
                //lvm.Polyline = l.PolylineLatLon;
                lvm.Attributes = l.Attributes;
                lvm.Polyline = l.PolylineNorEst;
                vm.Links.Add(lvm);
            }

            return Json(vm);
        }

    }
}
