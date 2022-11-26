import { LatLngTuple } from "leaflet";
import React from "react";
import { Map as LeafletMap, Marker, TileLayer } from "react-leaflet";

interface MapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

export function Map({ latitude, longitude, zoom }: MapProps) {
  const latLng: LatLngTuple = [latitude, longitude];

  return (
    <LeafletMap id="mapId" center={latLng} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={latLng} draggable={false} />
    </LeafletMap>
  );
}
