import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap() {
  useEffect(() => {
    // Create map only once
    const map = L.map('map', {
      center: [13.0827, 80.2707],   // example: Chennai
      zoom: 13
    });

    // OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Locate user
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', (e) => {
      L.marker(e.latlng).addTo(map).bindPopup('You are here').openPopup();
    });

    return () => map.remove();
  }, []);

  return (
    <div
      id="map"
      style={{ height: '500px', width: '100%' }}
    />
  );
}
