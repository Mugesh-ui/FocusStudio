import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export default function MapView() {
  return (
    <MapContainer center={[13.0827, 80.2707]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[13.0827, 80.2707]}>
        <Popup>Focus Studio Location</Popup>
      </Marker>
    </MapContainer>
  );
}
