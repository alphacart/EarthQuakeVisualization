// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + "<h4>" + feature.properties.mag +
      "</h4><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      // console.log(`Mag - ${ feature["properties"]["mag"]} `);
       return L.circleMarker(latlng, {
           radius: feature["properties"]["mag"]*4,
           fillColor: getColor(feature["properties"]["mag"]),
           color: "black",
           weight: 1,
           opacity: 1,
           fillOpacity: 0.8
       });
   }
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}
//Setting color scale
function getColor(mag){
  if(mag<1){
      return "limegreen";
  }else if(mag<2.5){
      return "green";
  }else if(mag<4.5){
      return "yellow";
  }else if(mag<8){
      return "orange";
  }else{
      return "red";
  }
}

// var legend = L.control({position: 'bottomright'});
// legend.onAdd = function (map) {
// var div = L.DomUtil.create('div', 'info legend'),
//     categories = [1, 2.5, 4.5, 8],
//     // labels = [];
// for (var j = 0; j < categories.length; j++) {
//     div.innerHTML +=
//         '<j style="background:' + getColor(categories[j] + 1) + '"></j> ' +
//         categories[j] + (categories[j + 1] ? '&ndash;' + categories[j + 1] + '<br>' : '+');
//  }

//  return div;
//  };

 legend.addTo(map);

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var Satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var Grayscale = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var Outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  });


  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satellite": Satellite,
    "Grayscale": Grayscale,
    "Outdoors": Outdoors
  };

  // Create overlay object to hold our overlay layer
  var Faultlines = new L.LayerGroup();
  var overlayMaps = {
    Earthquakes: earthquakes,
    Faultlines: Faultlines
  };

  // Create our map, giving it the Satellite and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [Satellite, earthquakes,Faultlines ]
  });

  var faultlines_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

  d3.json(faultlines_url,function(data){
      L.geoJSON(data,{
          color:"red",
          weight:2
      }).addTo(Faultlines);
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
