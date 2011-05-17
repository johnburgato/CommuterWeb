var map = null;
var bingMapKey = "AnMCgt4EpRMhL1ZXDdQUruATqSpuUB3W76XzQwtuu3Z_0bE6X1QA2edGu0Owv1lP";
var osgb = null;

$(document).ready(function() {

    var jqMapDiv = $("#mapDiv");
    if (jqMapDiv.size() > 0) {
        map = new Microsoft.Maps.Map(jqMapDiv.get(0), 
        { credentials: bingMapKey,
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          showMapTypeSelector: false,
          zoom: 14,
          center: new Microsoft.Maps.Location(51.236543, -0.758163)
        });
    }

    osgb = new GT_OSGB();
});

function Fail(args) {
    alert("F**ker");
    alert(args.get_data());
}

function GetLinksBegin() {
    alert("go");
}

var polygoncolor = new Microsoft.Maps.Color(100, 100, 0, 100);
function GetLinksSuccess(args) {
    var d = args.get_data();
    var jsnObj = eval('(' + d + ')');

    for (var i = 0; i < jsnObj.Links.length; ++i) {
        var l = jsnObj.Links[i];
        var vertices = new Array();
        for (var j = 0; j < l.Polyline.length; ++j) {
            var coord = l.Polyline[j];

            var wgs84 = OsgbToWgs(coord.X, coord.Y);
            coord.X = wgs84.longitude;
            coord.Y = wgs84.latitude;
            
            vertices.push(new Microsoft.Maps.Location(coord.Y, coord.X));
        }

        var polyline = new Microsoft.Maps.Polyline(vertices, { strokeColor: polygoncolor, strokeThickness: 5 });

        polyline.data = l.Attributes;
        
        // Add the polyline to the map
        map.entities.push(polyline);

        Microsoft.Maps.Events.addHandler(polyline, 'mouseover', displayInfo);
        Microsoft.Maps.Events.addHandler(polyline, 'mouseout', undisplayInfo);
    }
}

var selColor = new Microsoft.Maps.Color(255, 255, 0, 0);
function displayInfo(ev) {
    
    var polyline = ev.target;
    polyline.setOptions({ strokeColor: selColor, strokeThickness: 8 });

    $('#debugOutputDiv').text(polyline.data);
}

function undisplayInfo(ev) {
    ev.target.setOptions({ strokeColor: polygoncolor, strokeThickness: 5 });
}

function OsgbToWgs(eastings, northings) {
    var osgb = new GT_OSGB();
    //osgb.eastings = ORBEON.xforms.Document.getValue('origin-easting');
    //osgb.northings = ORBEON.xforms.Document.getValue('origin-northing');
    osgb.eastings = eastings;
    osgb.northings = northings;
    return osgb.getWGS84();

    //wgs84.longitude, wgs84.latitude
}


function Test1() {
    var center = map.getCenter();
    var pin = new Microsoft.Maps.Pushpin(center, { text: '1' });
    map.entities.push(pin);
}

function Test2() {

    var center = map.getCenter();

    var minLat = center.latitude - 0.001;
    var maxLat = center.latitude + 0.001;
    var minLon = center.longitude - 0.001;
    var maxLon = center.longitude + 0.001;

    // Create a polygon
    var vertices = new Array(
        new Microsoft.Maps.Location(maxLat, minLon),
        new Microsoft.Maps.Location(maxLat, maxLon),
        new Microsoft.Maps.Location(minLat, maxLon),
        new Microsoft.Maps.Location(minLat, minLon),
        new Microsoft.Maps.Location(maxLat, minLon));
    var polygoncolor = new Microsoft.Maps.Color(100, 100, 0, 100);
    //var polygon = new Microsoft.Maps.Polygon(vertices, { fillColor: polygoncolor, strokeColor: polygoncolor });
    var polyline = new Microsoft.Maps.Polyline(vertices, { strokeColor: polygoncolor, strokeThickness: 5 });
    // Add the polygon to the map
    map.entities.push(polyline);
    alert(polyline.getLocations()[0].toString());
}