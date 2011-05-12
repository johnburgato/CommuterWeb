using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

using TransportModel;
using TransportModel.Model;

namespace CommuterWeb.Models
{
    public class RoadNetwork
    {
        private static RoadNetwork instance = null;
        public static RoadNetwork Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new RoadNetwork();
                }

                return instance;
            }

            set
            {
                instance = value;
            }
        }

        public Model NetworkModel { get; set; }

        public static void Init()
        {
            instance = new RoadNetwork();
        }

        public RoadNetwork()
        {
            string modelFilePath = ConfigurationSettings.AppSettings["ModelFile"];
            Model model =  (Model) FileIOHelper.loadObject(modelFilePath);

            NetworkModel = model;
        }
    }
}
