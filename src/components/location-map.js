import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import iconLocationSvg from '../../public/images/icon-location.svg';
import Attribution from './attribution';

const StyledLocationMap = styled.div`
  min-height: 450px;
  position: relative;
  z-index: 0;
  flex: 1;
  width: 100%;

  .leaflet-bottom.leaflet-right {
    max-width: 46%;
    text-align: right;
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
      iconUrl: iconLocationSvg,
      iconSize: [46, 56],
    });
    L.marker([lat, lng], { icon: myIcon }).addTo(map);
    if (process.env.MB_API) {
      L.tileLayer(
        'http://localhost:8080/api/mapbox?id={id}&zoomLevel={z}&tiles={x}&tiles={y}',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(map);
    } else {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    }
  };

  return (
    <StyledLocationMap id='map'>
      <Attribution />
    </StyledLocationMap>
  );
};

export default LocationMap;
