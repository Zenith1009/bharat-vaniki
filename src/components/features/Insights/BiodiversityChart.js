import React, { useState } from 'react';
import { forestStatistics } from '../../../data/insights/forestStatistics';
import { speciesData } from '../../../data/insights/speciesData';

const BiodiversityChart = () => {
  const [activeChart, setActiveChart] = useState('forestTypes');
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });

  // Distinct color palettes for better differentiation
  const forestColors = ['#059669', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];
  const stateColors = ['#1e40af', '#dc2626', '#059669', '#7c3aed', '#ea580c', '#0891b2', '#65a30d', '#be123c'];
  const hotspotColors = ['#16a34a', '#2563eb', '#dc2626', '#9333ea', '#ea580c', '#0284c7', '#ca8a04', '#be185d'];
  const threatColors = ['#dc2626', '#ea580c', '#f59e0b', '#eab308'];

  // Prepare data for forest types distribution
  const forestTypesData = forestStatistics.forestTypes.map((type, index) => ({
    name: type.type.replace('Tropical ', '').replace('Montane ', '').replace('Forest', '').trim(),
    area: Math.round(type.area / 1000), // Convert to thousands for better display
    percentage: type.percentage,
    color: forestColors[index % forestColors.length]
  }));

  // Prepare data for state-wise forest cover
  const stateForestData = forestStatistics.stateWiseForestCover.slice(0, 8).map((state, index) => ({
    name: state.state.replace(' Pradesh', ''),
    area: Math.round(state.area / 1000), // Convert to thousands
    percentage: state.percentage,
    color: stateColors[index % stateColors.length]
  }));

  // Prepare data for biodiversity hotspots
  const hotspotData = forestStatistics.biodiversityHotspots.map((hotspot, index) => ({
    name: hotspot.name,
    species: hotspot.endemicSpecies,
    area: Math.round(hotspot.area / 1000), // Convert to thousands
    color: hotspotColors[index % hotspotColors.length]
  }));

  // Prepare data for threatened species
  const threatenedSpeciesData = [
    { name: 'Critically Endangered', value: speciesData.threatenedSpecies.criticallyEndangered, color: threatColors[0] },
    { name: 'Endangered', value: speciesData.threatenedSpecies.endangered, color: threatColors[1] },
    { name: 'Vulnerable', value: speciesData.threatenedSpecies.vulnerable, color: threatColors[2] },
    { name: 'Near Threatened', value: speciesData.threatenedSpecies.nearThreatened, color: threatColors[3] }
  ];

  const chartOptions = [
    { key: 'forestTypes', label: 'Forest Types Distribution' },
    { key: 'stateForest', label: 'State-wise Forest Cover' },
    { key: 'biodiversityHotspots', label: 'Biodiversity Hotspots' },
    { key: 'threatenedSpecies', label: 'Threatened Species' }
  ];

  // Handle mouse events for tooltips (only for pie chart slices)
  const handleSliceMouseEnter = (event, slice) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      content: `${slice.name}: ${slice.percentage}% (${slice.value.toLocaleString()}${slice.unit || ''})`,
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleSliceMouseMove = (event) => {
    if (tooltip.show) {
      setTooltip(prev => ({
        ...prev,
        x: event.clientX,
        y: event.clientY
      }));
    }
  };

  const handleSliceMouseLeave = () => {
    setTooltip({ show: false, content: '', x: 0, y: 0 });
  };

  // Enhanced pie chart component with tooltips
  const PieChart = ({ data, size = 200, showLegend = true }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    const slices = data.map((item) => {
      const percentage = (item.value / total) * 100;
      const angle = (item.value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle += angle;

      const x1 = Math.cos((startAngle * Math.PI) / 180);
      const y1 = Math.sin((startAngle * Math.PI) / 180);
      const x2 = Math.cos((endAngle * Math.PI) / 180);
      const y2 = Math.sin((endAngle * Math.PI) / 180);

      const largeArc = angle > 180 ? 1 : 0;

      const pathData = [
        `M 0 0`,
        `L ${x1} ${y1}`,
        `A 1 1 0 ${largeArc} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      return {
        ...item,
        pathData,
        percentage: percentage.toFixed(1)
      };
    });

    return (
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        <div className="relative">
          <svg
            width={size}
            height={size}
            viewBox="-1 -1 2 2"
            className="transform -rotate-90"
            onMouseMove={handleSliceMouseMove}
          >
            {slices.map((slice, index) => (
              <path
                key={index}
                d={slice.pathData}
                fill={slice.color}
                stroke="white"
                strokeWidth="0.02"
                className="hover:opacity-80 hover:scale-105 transition-all duration-200 cursor-pointer"
                style={{ transformOrigin: 'center' }}
                onMouseEnter={(e) => handleSliceMouseEnter(e, slice)}
                onMouseLeave={handleSliceMouseLeave}
              />
            ))}
          </svg>
        </div>

        {showLegend && (
          <div className="grid grid-cols-1 gap-3 max-w-sm">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Legend</h4>
            {slices.map((slice, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border hover:shadow-md transition-shadow"
              >
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0 border-2 border-white shadow-sm"
                  style={{ backgroundColor: slice.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{slice.name}</div>
                  <div className="text-xs text-gray-600">
                    {slice.percentage}% • {slice.value.toLocaleString()}{slice.unit || ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'forestTypes':
        const forestPieData = forestTypesData.map(item => ({
          name: item.name,
          value: item.percentage,
          color: item.color,
          unit: '% of total forest area'
        }));
        return (
          <div className="min-h-96 py-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
              Forest Types Distribution (% of Total Forest Area)
            </h3>
            <PieChart data={forestPieData} size={250} />
          </div>
        );

      case 'stateForest':
        const statePieData = stateForestData.map(item => ({
          name: item.name,
          value: item.area,
          color: item.color,
          unit: 'k sq km'
        }));
        return (
          <div className="min-h-96 py-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
              Top States by Forest Area Coverage
            </h3>
            <PieChart data={statePieData} size={250} />
          </div>
        );

      case 'biodiversityHotspots':
        const hotspotPieData = hotspotData.map(item => ({
          name: item.name,
          value: item.species,
          color: item.color,
          unit: ' endemic species'
        }));
        return (
          <div className="min-h-96 py-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
              Endemic Species Distribution Across Biodiversity Hotspots
            </h3>
            <PieChart data={hotspotPieData} size={250} />
          </div>
        );

      case 'threatenedSpecies':
        const threatenedPieData = threatenedSpeciesData.map(item => ({
          name: item.name,
          value: item.value,
          color: item.color,
          unit: ' species'
        }));
        return (
          <div className="min-h-96 py-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
              Threatened Species by Conservation Status
            </h3>
            <PieChart data={threatenedPieData} size={250} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 relative">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Biodiversity & Forest Data Visualization
      </h2>

      {/* Chart Selection Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {chartOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => setActiveChart(option.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${activeChart === option.key
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="bg-gray-50 rounded-lg p-4">
        {renderChart()}
      </div>

      {/* Chart Description */}
      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">
          {chartOptions.find(opt => opt.key === activeChart)?.label}
        </h4>
        <p className="text-sm text-gray-700">
          {activeChart === 'forestTypes' &&
            "Distribution of different forest types across India, showing both area coverage and percentage of total forest area."
          }
          {activeChart === 'stateForest' &&
            "Top states by forest cover area and their forest coverage percentage relative to their total geographical area."
          }
          {activeChart === 'biodiversityHotspots' &&
            "Major biodiversity hotspots in India showing endemic species count and total area coverage."
          }
          {activeChart === 'threatenedSpecies' &&
            "Distribution of threatened species across different conservation status categories according to IUCN Red List."
          }
        </p>
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          className="fixed z-50 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none"
          style={{
            left: tooltip.x - 300,
            top: tooltip.y + 20
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default BiodiversityChart;