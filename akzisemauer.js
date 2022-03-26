export const loadLeafletMap = () => {

  //initialize map
  const map = L.map('Leaflet_map', {
      zoomControl: true,
      maxZoom: 18,
      minZoom: 1,
      crs: L.CRS.EPSG3857,
      scrollWheelZoom: false
    }).setView([52.513660, 13.408072], 13);
  map.addControl(new L.Control.Fullscreen());
      
      
  // UNDERRLYING BASEMAP
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXVyYmFuaXRlIiwiYSI6ImNraHV6a3lpcDE5Mm0yeGxoamNwYnM4aG0ifQ.UjGPc3-QhAiSJIz8mhtvRg', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
  }).addTo(map);
      
      
  // DISTRICT BRODERS
  const bezirksgrenzen = new L.GeoJSON.AJAX("./akzisemauer_data/district.geojson", {
    interactive: false,
    style: {
      "color": "#717171",
      "weight": 0,
      "fillOpacity": 0.4
      }
  });
  bezirksgrenzen.addTo(map).bringToBack();
      
      
  //WALL
  const akzise_wall = new L.GeoJSON.AJAX("./akzisemauer_data/wall.geojson", {
    interactive: false,
    style: (feature) => {
    return {
      color: feature.properties.bezirk === "Friedrichshain-Kreuzberg" ? "#e5b813" : "#666666",
      weight: 3,
          };
      }
  });
  akzise_wall.addTo(map);
      
      
  //GATES
  const akzise_gates = new L.GeoJSON.AJAX("./akzisemauer_data/gates.geojson", {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
      radius: feature.properties.type === "station" ? "14" : "8",
      fillColor: feature.properties.bezirk === "Friedrichshain-Kreuzberg" ? "#e5b813" : "#666666",
      color: "#000",
      weight: 0.3,
      opacity: 1,
      fillOpacity: 0.8
    }),
    onEachFeature: (feature, layer) => layer.bindPopup(feature.properties.popup, {closeButton: ''})
  });
  akzise_gates.addTo(map);

  
  //WALL PIECES
  const wallpieces = new L.GeoJSON.AJAX("./akzisemauer_data/wallpieces.geojson", {
    pointToLayer: (feature, latlng) => L.marker(latlng, {
      icon: L.divIcon({ className: feature.properties.bezirk === "Friedrichshain-Kreuzberg" ? 'wallpiece1' : 'wallpiece2'})
    }),
    onEachFeature: (feature, layer) => layer.bindPopup(feature.properties.popup, {closeButton: ''})
  });
  wallpieces.addTo(map);

      
  // HISTORIC MAP OVERLAY
  L.control.layers(null, {
          "1750": L.tileLayer('http://warper.wmflabs.org/maps/tile/188/{z}/{x}/{y}.png'),
          "1804": L.tileLayer('http://warper.wmflabs.org/maps/tile/468/{z}/{x}/{y}.png'),
          "1863": L.tileLayer('http://warper.wmflabs.org/maps/tile/287/{z}/{x}/{y}.png'),
      },
      { position: 'bottomleft', collapsed:false }
  ).addTo(map);
      
  
  //bugfix refresh
  setInterval(function() {
    map.invalidateSize();
  }, 100);

};

