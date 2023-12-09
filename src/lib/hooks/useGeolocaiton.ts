import { useState, useEffect } from "react";
import { Location } from "../types";

const useGeolocation = (): Location => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
    error: "",
  });

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setLocation({
        latitude: null,
        longitude: null,
        error: error.message || "Error fetching geolocation",
      });
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by your browser",
      });
    }
  }, []);

  return location;
};

export default useGeolocation;
