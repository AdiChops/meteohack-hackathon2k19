import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS.js';
import {fromLonLat} from 'ol/proj.js';


const openStreetMap = new TileLayer({
	  source: new OSM()
	});
const climateStations = new TileLayer({
	  source: new TileWMS({
		url: 'https://geo.weather.gc.ca/geomet-climate?version=1.3.0',
		params: {'LAYERS': 'CLIMATE.STATIONS', 'TILED': true},
		serverType: 'geoserver',
		transition: 0
	  })
	});
	
var map = new Map({
	target: 'map',
  
	layers: [
		openStreetMap
	],
	view: new View({
		center: fromLonLat([-75.6972, 45.4215]),
        zoom: 3
	})
});

map.layers = [
	openStreetMap,
	climateStations
	];
	
//window.map = map;
//window.climateStations = climateStations;

function displayLayer(name, legend)
{
	//map.removeLayer(climateStations);
	map.addLayer(
		new TileLayer({
			source: new TileWMS({
				url: 'https://geo.weather.gc.ca/geomet-climate?version=1.3.0',
				params: {'LAYERS': name, 'TILED': true},
				serverType: 'geoserver',
				transition: 0
			}), 
			opacity: 0.5,
		})
	);
	alert(name);
}

function addChildLayers(container, layerNode)
{

	if (layerNode.children("Layer").length === 0) 
	{
		var title = layerNode.children("Title").text();
		var name = layerNode.children("Name").text();
		//var legend = layerNode.children("
		//console.log("Title: ", title, "Name: ", name);
		var li = $("<li>" + title + "</li>");
		var button = $("<button>Select</button>");
		button.click(function () { displayLayer(name) });
		li.append(button);
		container.append(li);
		//li.append("<span class='caret'>" + title + "</span>");
	} else {
		var title = layerNode.children("Title").text();
		var li = $("<li><span class='caret'>" + title + "</span></li>");
		var ul = $("<ul class='nested'>");
		layerNode.children("Layer").each(function () {
			addChildLayers(ul, $(this));
		});
		li.append(ul);
		container.append(li);
	}
}

function setupTree() {
	var toggler = document.getElementsByClassName("caret");
	var i;

	for (i = 0; i < toggler.length; i++) {
	  toggler[i].addEventListener("click", function() {
		this.parentElement.querySelector(".nested").classList.toggle("active");
		this.classList.toggle("caret-down");
	  });
	} 
}

$.get({
	url: "https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0&request=GetCapabilities",
	success: function (data) {
		window.data = data;
		var airTemp = $(data).find("Layer > Title:contains('Air temperature')").parent();
		//.filter(function (index, element) {
		//	$(element).children("Title:contains('Air temperature')").length > 0;
		//});
		console.log(airTemp);
		var list = addChildLayers($("#layers"), airTemp);
		
		setupTree();
	}
});


