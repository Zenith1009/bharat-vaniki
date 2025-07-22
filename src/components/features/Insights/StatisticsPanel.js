import React from 'react';
import { forestStatistics } from '../../../data/insights/forestStatistics';

const StatisticsPanel = () => {
  const { overview, keyMetrics } = forestStatistics;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Indian Forest Statistics
      </h2>
      
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {keyMetrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center border border-green-200 hover:shadow-md transition-shadow duration-300"
          >
            <div className="text-4xl mb-3">{metric.icon}</div>
            <div className="text-2xl font-bold text-green-800 mb-1">
              {metric.value}
            </div>
            <div className="text-sm text-green-600 font-medium mb-2">
              {metric.unit}
            </div>
            <div className="text-sm text-gray-700 mb-2">
              {metric.description}
            </div>
            <div className="text-xs text-green-600 font-medium">
              {metric.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Overview */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">
          Comprehensive Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-lg font-semibold text-green-700 mb-2">
              Protected Areas
            </div>
            <div className="space-y-1 text-sm text-gray-700">
              <div>National Parks: <span className="font-medium">{overview.nationalParks}</span></div>
              <div>Wildlife Sanctuaries: <span className="font-medium">{overview.wildlifeSanctuaries}</span></div>
              <div>Tiger Reserves: <span className="font-medium">{overview.tigerReserves}</span></div>
              <div>Biosphere Reserves: <span className="font-medium">{overview.biosphereReserves}</span></div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-lg font-semibold text-green-700 mb-2">
              Forest Coverage
            </div>
            <div className="space-y-1 text-sm text-gray-700">
              <div>Total Area: <span className="font-medium">{overview.totalForestCover.toLocaleString()} sq km</span></div>
              <div>Coverage: <span className="font-medium">{overview.forestCoverPercentage}%</span></div>
              <div>of total geographical area</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-lg font-semibold text-green-700 mb-2">
              Environmental Impact
            </div>
            <div className="space-y-1 text-sm text-gray-700">
              <div>Carbon Storage: <span className="font-medium">{overview.carbonSequestration} MT</span></div>
              <div>Species Count: <span className="font-medium">{overview.biodiversityCount.toLocaleString()}+</span></div>
              <div>Conservation Projects: <span className="font-medium">{overview.conservationProjects}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;