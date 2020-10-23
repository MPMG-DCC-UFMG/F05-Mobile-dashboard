import {Map, Marker, TileLayer} from "react-leaflet";
import {LatLngTuple} from "leaflet";
import React from "react";

interface MapViewProps {
    latitude: number,
    longitude: number,
    zoom: number
}

export const MapView: React.FC<MapViewProps> = (props => {

    const latLng: LatLngTuple = [props.latitude, props.longitude];

    return (
        <Map id="mapId"
             center={latLng}
             zoom={props.zoom}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                       attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>
            <Marker position={latLng} draggable={false}/>
        </Map>
    )
})