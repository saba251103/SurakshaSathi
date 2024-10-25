import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFuYXZpMTIzIiwiYSI6ImNsc3hjdjAzcTAxb3kycXAya3IyNnl3djgifQ.vyfIAPnhABA9sgvga4F6XA'; // Replace with your Mapbox access token

const Anomoly = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [directions, setDirections] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [deviationAlert, setDeviationAlert] = useState(false);
  const [sosTimeout, setSosTimeout] = useState(null);
  const safeDistanceThreshold = 0.005; // Adjust as needed

  // Function to store user location in the database
  const storeUserLocation = async (location) => {
    try {
      await fetch('https://suraksha-84726-default-rtdb.firebaseio.com/users/N4iwwMbD5xViwkdjFSFk7dmQTyw2/location.json', { // Replace with your API endpoint
        method: 'PATCH', // Use PATCH to update location
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      });
    } catch (error) {
      console.error('Error storing location:', error);
    }
  };

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          storeUserLocation({ latitude, longitude }); // Store initial location
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please ensure location services are enabled.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 14,
      });
      setMapInstance(map);

      const directionsControl = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
      });
      map.addControl(directionsControl, 'top-left');
      setDirections(directionsControl);

      new mapboxgl.Marker({ color: 'orange' })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .addTo(map)
        .setPopup(new mapboxgl.Popup().setText('You are here'));

      directionsControl.on('route', (e) => {
        if (e.route && e.route[0]) {
          const coordinates = e.route[0].geometry.coordinates;
          setRouteCoords(coordinates);
          monitorRoute(coordinates); // Start monitoring the route
        }
      });

      return () => map.remove();
    }
  }, [userLocation]);

  // Function to monitor the user's real-time position
  const monitorRoute = (routeCoords) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Store user's current location
          storeUserLocation({ latitude, longitude });

          // Only check deviation if routeCoords has coordinates
          if (Array.isArray(routeCoords) && routeCoords.length > 0) {
            const isDeviating = checkDeviation([longitude, latitude], routeCoords);

            if (isDeviating) {
              handleDeviation();
            } else if (deviationAlert) {
              clearTimeout(sosTimeout);
              setDeviationAlert(false);
            }
          }
        },
        (error) => {
          console.error("Error watching position:", error);
        }
      );
    }
  };

  const checkDeviation = (currentCoords, routeCoords) => {
    if (!Array.isArray(routeCoords) || routeCoords.length === 0) {
      return false; // No deviation if no route is set
    }

    return !routeCoords.some(([lng, lat]) => {
      const distance = Math.sqrt(
        Math.pow(currentCoords[0] - lng, 2) + Math.pow(currentCoords[1] - lat, 2)
      );
      return distance < safeDistanceThreshold;
    });
  };

  const handleDeviation = () => {
    if (!deviationAlert) {
      setDeviationAlert(true);

      const timeout = setTimeout(() => {
        sendSosAlert();
      }, 300000); // 5 minutes

      setSosTimeout(timeout);
    }
  };

  const sendSosAlert = () => {
    alert("SOS Alert: User has deviated from the path and didn't respond!");
    // Code to notify nearby users goes here
  };

  const handleConfirmSafety = () => {
    setDeviationAlert(false);
    clearTimeout(sosTimeout);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', backgroundColor: 'black' }}>
      <div style={{ width: '25%', padding: '10px', backgroundColor: '#08343f', overflowY: 'auto', color: 'white' }}>
        <h2>Safety Dashboard</h2>
        {deviationAlert && (
          <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#0d7b7d', borderRadius: '8px' }}>
            <strong>Deviation Detected!</strong>
            <br />
            Confirm if you are safe.
            <br />
            <button 
              onClick={handleConfirmSafety}
              style={{
                padding: '8px',
                backgroundColor: '#0d7b7d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              I'm Safe
            </button>
          </div>
        )}
        <p>Set your route, and the system will monitor for deviations.</p>
      </div>
      <div id="map" style={{ width: '75%', height: '100%' }}></div>
    </div>
  );
};

export default Anomoly;
