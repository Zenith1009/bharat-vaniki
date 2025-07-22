import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { forestRegions } from '../../../data/insights/forestRegions';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);

const InteractiveMap = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mapFilter, setMapFilter] = useState('all');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter regions based on selected filter
  const filteredRegions = forestRegions.majorRegions.filter(region => {
    if (mapFilter === 'all') return true;
    if (mapFilter === 'hotspots') return region.type === 'Biodiversity Hotspot';
    if (mapFilter === 'tiger') return region.type === 'Tiger Landscape';
    if (mapFilter === 'unique') return ['Mangrove Ecosystem', 'Island Ecosystem', 'Arid Ecosystem'].includes(region.type);
    return true;
  });

  // Get marker color based on region type
  const getMarkerColor = (type) => {
    switch (type) {
      case 'Biodiversity Hotspot': return '#dc2626'; // Red
      case 'Tiger Landscape': return '#ea580c'; // Orange
      case 'Mangrove Ecosystem': return '#0891b2'; // Cyan
      case 'Island Ecosystem': return '#7c3aed'; // Purple
      case 'Arid Ecosystem': return '#ca8a04'; // Yellow
      default: return '#16a34a'; // Green
    }
  };

  // Get marker size based on area (fixed size that doesn't change with zoom)
  const getMarkerSize = (area) => {
    if (area > 200000) return 12;
    if (area > 100000) return 10;
    if (area > 50000) return 8;
    return 6;
  };

  if (!isClient) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Interactive Forest Distribution Map
        </h2>
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Interactive Forest Distribution Map
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <button
          onClick={() => setMapFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${mapFilter === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
        >
          All Regions
        </button>
        <button
          onClick={() => setMapFilter('hotspots')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${mapFilter === 'hotspots'
              ? 'bg-red-600 text-white'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
        >
          Biodiversity Hotspots
        </button>
        <button
          onClick={() => setMapFilter('tiger')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${mapFilter === 'tiger'
              ? 'bg-orange-600 text-white'
              : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
            }`}
        >
          Tiger Landscapes
        </button>
        <button
          onClick={() => setMapFilter('unique')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${mapFilter === 'unique'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
        >
          Unique Ecosystems
        </button>
      </div>

      {/* Map Container */}
      <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={[20.5937, 78.9629]} // Center of India
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {filteredRegions.map((region) => (
            <CircleMarker
              key={region.id}
              center={[region.location.coordinates.lat, region.location.coordinates.lon]}
              radius={getMarkerSize(region.location.area)}
              fillColor={getMarkerColor(region.type)}
              color="#ffffff"
              weight={2}
              opacity={1}
              fillOpacity={0.7}
              eventHandlers={{
                click: () => setSelectedRegion(region),
              }}
            >
              <Popup>
                <div className="p-2 max-w-xs">
                  <h3 className="font-bold text-lg text-green-800 mb-2">
                    {region.name}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Type:</strong> {region.type}</p>
                    <p><strong>Area:</strong> {region.location.area.toLocaleString()} sq km</p>
                    <p><strong>States:</strong> {region.location.states.slice(0, 3).join(', ')}
                      {region.location.states.length > 3 && ` +${region.location.states.length - 3} more`}
                    </p>
                    <p><strong>Total Species:</strong> {region.biodiversity.totalSpecies.toLocaleString()}</p>
                    <p><strong>Endemic Species:</strong> {region.biodiversity.endemicSpecies.toLocaleString()}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-gray-600">
                      {region.significance[0]}
                    </p>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-600 mr-2"></div>
            <span className="text-gray-800 font-medium">Biodiversity Hotspot</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-orange-600 mr-2"></div>
            <span className="text-gray-800 font-medium">Tiger Landscape</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-cyan-600 mr-2"></div>
            <span className="text-gray-800 font-medium">Mangrove Ecosystem</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-purple-600 mr-2"></div>
            <span className="text-gray-800 font-medium">Island Ecosystem</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-600 mr-2"></div>
            <span className="text-gray-800 font-medium">Arid Ecosystem</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
            <span className="text-gray-800 font-medium">Other Regions</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-700 bg-blue-50 p-2 rounded">
          <p className="font-medium">Circle size represents the area of the forest region. Click on markers for detailed information.</p>
        </div>
      </div>

      {/* Selected Region Details */}
      {selectedRegion && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-bold text-lg text-green-800">
              {selectedRegion.name}
            </h4>
            <button
              onClick={() => setSelectedRegion(null)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-green-700 mb-2">Basic Information</h5>
              <div className="space-y-2">
                <p className="text-slate-700"><span className="font-semibold text-green-800">Type:</span> <span className="text-slate-600 font-medium">{selectedRegion.type}</span></p>
                <p className="text-slate-700"><span className="font-semibold text-green-800">Area:</span> <span className="text-blue-600 font-semibold">{selectedRegion.location.area.toLocaleString()}</span> <span className="text-slate-600">sq km</span></p>
                <p className="text-slate-700"><span className="font-semibold text-green-800">States:</span> <span className="text-slate-600 font-medium">{selectedRegion.location.states.join(', ')}</span></p>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-green-700 mb-2">Biodiversity</h5>
              <div className="space-y-2">
                <p className="text-slate-700"><span className="font-semibold text-green-800">Total Species:</span> <span className="text-emerald-600 font-bold">{selectedRegion.biodiversity.totalSpecies.toLocaleString()}</span></p>
                <p className="text-slate-700"><span className="font-semibold text-green-800">Endemic Species:</span> <span className="text-amber-600 font-bold">{selectedRegion.biodiversity.endemicSpecies.toLocaleString()}</span></p>
                <p className="text-slate-700"><span className="font-semibold text-green-800">Key Species:</span> <span className="text-slate-600 font-medium italic">{selectedRegion.biodiversity.keySpecies.slice(0, 3).join(', ')}</span></p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="font-semibold text-green-700 mb-2">Conservation Status</h5>
            <p className="text-sm text-slate-700 font-medium bg-green-100 px-3 py-2 rounded-md border-l-4 border-green-500">{selectedRegion.conservation.conservationStatus}</p>
            <p className="text-sm mt-2 text-slate-700">
              <span className="font-semibold text-green-800">Protected Areas:</span> <span className="text-purple-600 font-bold">{selectedRegion.conservation.protectedAreas}</span>
              <span className="text-slate-600"> (</span><span className="text-blue-600 font-semibold">{selectedRegion.conservation.nationalParks}</span><span className="text-slate-600"> National Parks, </span><span className="text-teal-600 font-semibold">{selectedRegion.conservation.wildlifeSanctuaries}</span><span className="text-slate-600"> Wildlife Sanctuaries)</span>
            </p>
          </div>

          <div className="mt-4">
            <h5 className="font-semibold text-green-700 mb-2">Significance</h5>
            <ul className="text-sm space-y-2">
              {selectedRegion.significance.slice(0, 2).map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-3 text-lg font-bold">🌿</span>
                  <span className="text-slate-700 font-medium leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;