// Creating map object
var myMap = L.map("map", {
  center: [39.32, -76.6],
  zoom: 12
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


//Get the crime data csv output file from our sql database 
var crimeData = "static/data/crimedata_final.csv";

//Read the csv and print it to the console
d3.csv(crimeData, function(response) {
    console.log(response);

// Create a new marker cluster group
  var markers = L.markerClusterGroup();  

//Loop through the response
  for (var i = 0; i < response.length; i++) {
    var latitude = response[i].Latitude;
    var longitude = response[i].Longitude;
//If a latitude exists, push the coordinates to the heat array
if (response[i].Latitude) {
// Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([response[i].Latitude, response[i].Longitude])
    .bindPopup(response[i].CrimeDate));
}}
// Add our marker cluster layer to the map
myMap.addLayer(markers);
});