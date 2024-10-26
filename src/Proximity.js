import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { getDatabase, ref, onValue } from 'firebase/database';

// Function to calculate distance using Haversine formula
const haversineDistance = (coords1, coords2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRadians(coords2.latitude - coords1.latitude);
  const dLon = toRadians(coords2.longitude - coords1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coords1.latitude)) *
    Math.cos(toRadians(coords2.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

mapboxgl.accessToken = 'pk.eyJ1IjoibWFuYXZpMTIzIiwiYSI6ImNsc3hjdjAzcTAxb3kycXAya3IyNnl3djgifQ.vyfIAPnhABA9sgvga4F6XA';

const SafetyDashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [directions, setDirections] = useState(null);

  // Fetch user locations from Firebase
  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users/');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const users = Object.keys(data).map((key) => {
          const user = data[key];
          const { location } = user;

          // Only return users with a valid location
          if (location && location.latitude && location.longitude) {
            return {
              id: key,
              location: {
                latitude: location.latitude,
                longitude: location.longitude,
              },
            };
          }
          return null; // Return null if location is invalid
        }).filter(Boolean); // Filter out null values

        setUsersData(users);
      }
    });
  }, []);

  useEffect(() => {
    if (userLocation && usersData.length > 0) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 14,
      });
      setMapInstance(map);

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
      });
      map.addControl(directions, 'top-left');
      setDirections(directions);

      // Marker for user's current location
      new mapboxgl.Marker({ color: 'orange' })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .addTo(map)
        .setPopup(new mapboxgl.Popup().setText('You are here'));

      // Add a marker for each user in usersData
      usersData.forEach((user) => {
        const { latitude, longitude } = user.location;
        const distance = haversineDistance(userLocation, { latitude, longitude });

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setText(`User ID: ${user.id}\nLocation: ${latitude}, ${longitude}\nDistance: ${distance.toFixed(2)} km`);

        // Add marker with popup for each user
        new mapboxgl.Marker({ color: distance >= 1 && distance <= 2 ? 'blue' : 'gray' }) // Blue for users in 1-2 km range, gray otherwise
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map);
      });

      return () => map.remove();
    }
  }, [userLocation, usersData]);

  // Get the current user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      });
    }
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div style={{ width: '25%', padding: '10px', backgroundColor: '#08343f', color: 'white', overflowY: 'auto' }}>
        <h2 style={{ color: '#0d7b7d' }}>Nearby Users</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {/* Display current user's info */}
          {userLocation && (
            <li style={{ margin: '10px 0', padding: '10px', backgroundColor: '#0d7b7d', borderRadius: '8px', color: 'white' }}>
              Current User
              <br />
              Location: {userLocation.latitude}, {userLocation.longitude}
            </li>
          )}
          {/* Display all users' info with distance */}
          {usersData.map((user) => {
            const distance = userLocation ? haversineDistance(userLocation, user.location) : null;
            return (
              <li key={user.id} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#0d7b7d', borderRadius: '8px', color: 'white' }}>
                User ID: {user.id}
                <br />
                Location: {user.location.latitude}, {user.location.longitude}
                {distance && <br />}
                Distance: {distance ? `${distance.toFixed(2)} km` : 'Calculating...'}
              </li>
            );
          })}
        </ul>
      </div>
      <div id="map" style={{ width: '75%', height: '100%' }}></div>
    </div>
  );
};

export default SafetyDashboard;
