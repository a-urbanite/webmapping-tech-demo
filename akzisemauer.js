// console.log('DS22222222AF')
export const loadLeafletMap = () => {
    
    // console.log('DSFSADFDSAF')
    //initialize map
    var map = L.map('Leaflet_map', {
        zoomControl: true,
        maxZoom: 18,
        minZoom: 1,
        crs: L.CRS.EPSG3857,
        scrollWheelZoom: false
      }).setView([52.513660, 13.408072], 13);
      
      
      // BASEMAP
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXVyYmFuaXRlIiwiYSI6ImNraHV6a3lpcDE5Mm0yeGxoamNwYnM4aG0ifQ.UjGPc3-QhAiSJIz8mhtvRg', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token'
      }).addTo(map);
      
      
      // DISTRICT BRODERS
      const bezirksgrenzen = new L.GeoJSON.AJAX("./akzisemauer_data/bezirksgrenzen_simp.geojson", {
        interactive: false,
        style: {
          "color": "#717171",
          "weight": 0,
          "fillOpacity": 0.4
          }
      });
      bezirksgrenzen.addTo(map).bringToBack();
      
      
      //WALL
      const akzise_wall = new L.GeoJSON.AJAX("./akzisemauer_data/akzise_wall.geojson", {
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
      
      
      
      
      //wallpieces marker Stresemannstraße
      var wallpiece1 = L.marker([52.502779, 13.384523], {
          icon: L.divIcon({ className: 'wallpiece1' })
        })
        .bindPopup("<img class='akzise_image' src='https://www.akzisemauer-berlin.de/wp-content/uploads/2020/09/Berliner_Akzisemauer.jpg' alt='stresemannstraße stück'/>")
        .openPopup()
        .addTo(map);
      
      
      //wallpieces marker Hannoversche Straße
      var wallpiece2 = L.marker([52.528414, 13.380004], {
          icon: L.divIcon({ className: 'wallpiece2' })
        })
        .bindPopup("<img class='akzise_image' src='https://www.akzisemauer-berlin.de/wp-content/uploads/2020/09/Berlin_Mitte_Hannoversche_Strasse_9_Akzisemauer-scaled.jpg' alt='stresemannstraße stück' />")
        .openPopup()
        .addTo(map);
      
      
      
      // HISTORIC MAP OVERLAY
      L.control.layers(null, {
              "1750": L.tileLayer('http://warper.wmflabs.org/maps/tile/188/{z}/{x}/{y}.png'),
              "1804": L.tileLayer('http://warper.wmflabs.org/maps/tile/468/{z}/{x}/{y}.png'),
              "1863": L.tileLayer('http://warper.wmflabs.org/maps/tile/287/{z}/{x}/{y}.png'),
          },
          { position: 'bottomleft', collapsed:false }
      ).addTo(map);
      
      
      
      map.addControl(new L.Control.Fullscreen());
      
      
      //bugfix refresh
      setInterval(function() {
        map.invalidateSize();
      }, 100);
};

// export default loadLeafletMap;
// module.exports.loadLeafletMap = loadLeafletMap;
