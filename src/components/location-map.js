import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledLocationMap = styled.div`
  height: 62.5vh;
  min-height: 400px;
  width: 100vw;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;

  @media (min-width: 768px) {
    height: 72.5vh;
  }
`;

const LocationMap = ({ lat, lng }) => {
  const [map, setMap] = useState(null);

  useEffect(() => setUpMap(), []);
  useEffect(() => panMapTo(), [lat, lng]);

  const setUpMap = () => {
    const mapConfig = {
      zoomControl: false,
      boxZoom: false,
      doubleClickZoom: false,
      dragging: false,
      keyboard: false,
      scrollWheelZoom: false,
      tap: false,
      touchZoom: false,
    };
    let leafletMap;
    if (!map) {
      leafletMap = L.map('map', mapConfig);
      setMap(leafletMap);
    } else {
      leafletMap = map;
    }
    const defaultPosition = [40.71427, -74.00597]; // new york
    leafletMap.setView(defaultPosition, 16);
  };

  const panMapTo = () => {
    if (!map || typeof lat === 'undefined' || typeof lng === 'undefined')
      return;

    map.panTo([lat, lng], 16).panBy([0, -35]);
    const myIcon = L.icon({
      iconUrl: 'public/images/icon-location.svg',
      iconSize: [46, 56],
    });
    L.marker([lat, lng], { icon: myIcon }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  };

  return <StyledLocationMap id='map' />;
};

export default LocationMap;
