import { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";

type Props = {
  longitude: number;
  latitude: number;
  zoom: number;
};

export const SimpleMap = ({ latitude, longitude }: Props) => {
  const mapRef = useRef(null);

  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      ref={mapRef}
      style={{ height: "100vh", width: "100vw", position: "absolute" }}
      className="-z-[10000]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        <Marker position={[latitude, longitude]}>
          <Popup>
            Latitude: {latitude}, Longitude: {longitude}
          </Popup>
        </Marker>
      }
    </MapContainer>
  );
};
