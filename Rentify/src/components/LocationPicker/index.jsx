import { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Button } from "react-bootstrap";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 31.981568,
  lng: 35.9235584,
};

export default function LocationPicker() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD164boEAkDOWxKojpHFaPRyRyK5sQoPpY",
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState({
    address: "",
    lat: "",
    lng: "",
  });
  const mapRef = useRef();
  const onMapClick = useCallback((event) => {
    setMarkers([
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
    setLocation({
      address: "",
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    // You might want to call a geocode API here to get the address from lat/lng
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          time: new Date(),
        };
        setMarkers([pos]);
        setLocation({
          address: "",
          lat: pos.lat,
          lng: pos.lng,
        });
        mapRef.current.panTo(pos);
      });
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
      <Button onClick={handleLocationDetect} className="text-white mt-3">
        تحديد الموقع
      </Button>
    </div>
  );
}
