<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
	Index
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script charset="UTF-8" type="text/javascript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0"></script>
    <script type="text/javascript" src="../../Scripts/geotools2/geotools2.js"></script>
    <script type="text/javascript" src="../../Scripts/Map/Map1.js"></script>

    <h2>Index</h2>
    <input type="button" value="Pin" onclick="Test1()" />
    <input type="button" value="Poly" onclick="Test2()" />
    <%= Ajax.ActionLink("Get links", "GetLinks", new { max = 1000 }, new AjaxOptions { OnSuccess = "GetLinksSuccess", OnFailure = "Fail", HttpMethod="POST" })%>
    <div id="debugOutputDiv">
    </div>
    <div id="mapDiv" class="bingMap"></div>
    

</asp:Content>
