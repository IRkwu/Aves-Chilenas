import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import geoJsonData from '../mocks/Regional.json';

const Map = ({ setSelectedRegion }) => {
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.Region) {
      layer.on({
        click: () => {
          setSelectedRegion(feature.properties.Region);
          layer.bindPopup(feature.properties.Region).openPopup();
        }
      });
    }
  };

  return (
    <MapContainer 
      center={[-41.55, -73.05]}
      zoom={8}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default Map;
