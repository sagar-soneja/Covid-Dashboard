import React from "react";
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../../util";

const Map = ({ countries, caseType, lat, log, zoom }) => {
  // const position = [ 34.80746, 40.4796  ]
  const position = [lat, log];

  return (
    <div className="m-container">
      <div className="wrapper">
        <div className="map" id="map">
          <MapContainer center={position} zoom={zoom}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {showDataOnMap(countries, caseType)}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
