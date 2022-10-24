import { LatLngTuple } from "leaflet";
import React from "react";
import { Map, Marker, TileLayer } from "react-leaflet";

interface MapViewProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

export const MapView: React.FC<MapViewProps> = (props) => {
  const latLng: LatLngTuple = [props.latitude, props.longitude];

  return (
    <Map id="mapId" center={latLng} zoom={props.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={latLng} draggable={false} />
    </Map>
  );
};
