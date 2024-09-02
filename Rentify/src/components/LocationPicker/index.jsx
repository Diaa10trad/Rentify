import { useState, useCallback, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Button } from "react-bootstrap";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

export default function LocationPicker({ setLocation }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD164boEAkDOWxKojpHFaPRyRyK5sQoPpY",
    libraries,
  });

  // Use state for dynamic center
  const [center, setCenter] = useState({
    lat: 32.534603,
    lng: 35.9235584,
  });

  const [markers, setMarkers] = useState([]);
  const mapRef = useRef();

  const onMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      setMarkers([
        {
          lat,
          lng,
          time: new Date(),
        },
      ]);

      setLocation({
        lat,
        lng,
      });

      // Re-center the map to the clicked position
      mapRef.current.panTo({ lat, lng });
    },
    [setLocation]
  );

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const pos = { lat, lng, time: new Date() };

          setMarkers([pos]);
          setLocation({ lat, lng });

          setCenter({ lat, lng });

          mapRef.current.panTo(pos);
        },
        (error) => {
          console.error("Error detecting location", error);
        },
        options
      );
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
        تحديد الموقع تلقائيًّا
      </Button>
    </div>
  );
}
