import React, { useEffect, useMemo, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFuYXZpMTIzIiwiYSI6ImNsc3hjdjAzcTAxb3kycXAya3IyNnl3djgifQ.vyfIAPnhABA9sgvga4F6XA'; // Replace with your Mapbox token

const SafetyDashboard = () => {
  const userLocation = useMemo(() => ({ latitude: 40.7128, longitude: -74.0060 }), []);
  
  const usersData = useMemo(() => [
    { id: 1, name: 'User A', phone: '9321718400', latitude: 40.7128, longitude: -74.0060, color: 'red' },
    { id: 2, name: 'User B', phone: '9876543217', latitude: 40.7130, longitude: -74.0058, color: 'blue' },
    { id: 3, name: 'User C', phone: '9197656134', latitude: 40.7132, longitude: -74.0062, color: 'green' },
  ], []);

  const [mapInstance, setMapInstance] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
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

    new mapboxgl.Marker({ color: 'orange' })
      .setLngLat([userLocation.longitude, userLocation.latitude])
      .addTo(map)
      .setPopup(new mapboxgl.Popup().setText('You are here'));

    usersData.forEach((user) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(`${user.name} - ${user.phone}`);
      
      new mapboxgl.Marker({ color: user.color })
        .setLngLat([user.longitude, user.latitude])
        .setPopup(popup)
        .addTo(map);
    });

    return () => map.remove();
  }, [userLocation, usersData]);

  const handleGetDirections = () => {
    if (!mapInstance || !directions) return;

    const nearestUser = usersData.reduce((closest, user) => {
      const distance = Math.sqrt(
        Math.pow(user.latitude - userLocation.latitude, 2) +
        Math.pow(user.longitude - userLocation.longitude, 2)
      );
      return distance < closest.distance ? { user, distance } : closest;
    }, { user: null, distance: Infinity }).user;

    if (nearestUser) {
      directions.setOrigin([userLocation.longitude, userLocation.latitude]);
      directions.setDestination([nearestUser.longitude, nearestUser.latitude]);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div style={{ width: '25%', padding: '10px', backgroundColor: '#08343f', color: 'white', overflowY: 'auto' }}>
        <h2 style={{ color: '#0d7b7d' }}>Nearby Users</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {usersData.map((user) => (
            <li key={user.id} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#0d7b7d', borderRadius: '8px', color: 'white' }}>
              <strong>{user.name}</strong>
              <br />
              Phone: {user.phone}
            </li>
          ))}
        </ul>
        <button 
          onClick={handleGetDirections}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '20px',
            backgroundColor: '#08343f',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Get Directions to Nearest User
        </button>
      </div>
      <div id="map" style={{ width: '75%', height: '100%' }}></div>
    </div>
  );
};

export default SafetyDashboard;
