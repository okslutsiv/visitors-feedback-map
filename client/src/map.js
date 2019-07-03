import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import shadow from "./images/marker-shadow.png";
console.log(shadow);
const userMarker = L.icon({
  iconUrl: require("./images/marker-icon.png"),
  iconRetinaUrl: require("./images/marker-icon-2x.png"),
  iconAnchor: [15, 45],
  popupAnchor: [5, -45],
  iconSize: [36, 60],
  shadowUrl: require("./images/marker-shadow.png"),
  shadowSize: [60, 60],
  shadowAnchor: [15, 45],
});

const MapWrapper = props => {
  const {
    haveUsersLocation,
    viewport,
    setViewPort,
    messages,
    showForm,
  } = props;

  const position = [viewport.lat, viewport.lng];

  const editPosition = e => {
    setViewPort({
      ...viewport,
      lat: e.target._latlng.lat,
      lng: e.target._latlng.lng,
    });
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Map center={position} zoom={viewport.zoom} id="map" maxZoom={18}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {haveUsersLocation && showForm && (
          <Marker
            position={position}
            draggable={true}
            autoPan={true}
            icon={userMarker}
            onMoveend={editPosition}
          >
            <Popup>Drag to edit your location</Popup>
          </Marker>
        )}
        {messages &&
          messages.map(m => (
            <Marker key={m._id} position={[m.latitude, m.longitude]}>
              <Popup>
                <strong>{m.username}:</strong> {m.msg}
              </Popup>
            </Marker>
          ))}
      </Map>
    </div>
  );
};
export default MapWrapper;
