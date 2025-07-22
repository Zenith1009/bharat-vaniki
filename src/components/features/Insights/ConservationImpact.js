import React, { useState } from 'react';
import { conservationImpact } from '../../../data/insights/conservationImpact';

const ConservationImpact = () => {
  const [activeTab, setActiveTab] = useState('programs');
  const { majorPrograms, speciesRecovery, communityConservation, technologyImpact, economicImpact, futureGoals } = conservationImpact;

  const tabs = [
    { id: 'programs', label: 'Major Programs', icon: '🏛️' },
    { id: 'species', label: 'Species Recovery', icon: '🦁' },
    { id: 'community', label: 'Community Initiatives', icon: '👥' },
    { id: 'technology', label: 'Technology Impact', icon: '📡' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Conservation Impact & Success Stories
      </h2>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8 border-b border-green-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 mx-2 mb-2 rounded-t-lg font-medium transition-colors duration-300 ${
              activeTab === tab.id
                ? 'bg-green-600 text-white border-b-2 border-green-600'
                : 'text-green-600 hover:bg-green-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Major Programs Tab */}
      {activeTab === 'programs' && (
        <div className="space-y-8">
          {majorPrograms.map((program) => (
            <div key={program.id} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-xl font-bold text-green-800 mb-2">{program.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Launched: {program.launchYear}</p>
                    <p className="text-gray-700">{program.description}</p>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Impact Metrics */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-green-700 mb-3">Key Impact</h4>
                      {Object.entries(program.impact).map(([key, value]) => (
                        <div key={key} className="mb-2">
                          <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          <div className="font-medium text-green-800">
                            {typeof value === 'object' ? 
                              `${value.before} → ${value.after} (${value.increase})` : 
                              value
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Key Achievements */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-green-700 mb-3">Key Achievements</h4>
                      <ul className="space-y-1">
                        {program.keyAchievements.slice(0, 4).map((achievement, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="text-green-600 mr-2">✓</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Future Goals */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-green-700 mb-3">Future Goals</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.futureGoals.map((goal, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Species Recovery Tab */}
      {activeTab === 'species' && (
        <div className="space-y-6">
          {speciesRecovery.map((species, index) => (
            <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-xl font-bold text-orange-800 mb-2">{species.species}</h3>
                    <p className="text-sm text-gray-600 mb-2">{species.location}</p>
                    <p className="text-sm text-gray-600 mb-3">Timeline: {species.timeline}</p>
                    <div className="text-sm">
                      <span className="font-medium text-orange-700">Current Status: </span>
                      <span className="text-gray-700">{species.currentStatus}</span>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  {/* Population Trend */}
                  <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                    <h4 className="font-semibold text-orange-700 mb-3">Population Recovery</h4>
                    <div className="flex flex-wrap gap-4">
                      {Object.entries(species.populationTrend).map(([year, population]) => (
                        <div key={year} className="text-center">
                          <div className="text-lg font-bold text-orange-800">{population}</div>
                          <div className="text-xs text-gray-600">{year}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Conservation Measures */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-orange-700 mb-3">Conservation Measures</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {species.conservationMeasures.map((measure, idx) => (
                        <div key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="text-orange-600 mr-2">•</span>
                          {measure}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Community Conservation Tab */}
      {activeTab === 'community' && (
        <div className="space-y-6">
          {communityConservation.map((initiative, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-3">{initiative.name}</h3>
              <p className="text-gray-700 mb-4">{initiative.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-blue-700 mb-3">Coverage & Impact</h4>
                  <div className="text-sm text-gray-600 mb-3">{initiative.coverage}</div>
                  <ul className="space-y-1">
                    {initiative.impact.map((impact, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-blue-700 mb-3">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {initiative.keyFeatures.map((feature, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Technology Impact Tab */}
      {activeTab === 'technology' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technologyImpact.map((tech, index) => (
            <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-purple-800 mb-2">{tech.technology}</h3>
              <p className="text-sm text-gray-600 mb-3">{tech.application}</p>
              <div className="text-sm text-purple-700 font-medium mb-3">{tech.coverage}</div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-2">Impact Areas</h4>
                <ul className="space-y-1">
                  {tech.impact.map((impact, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      {impact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Economic Impact Section */}
      <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 border border-green-300">
        <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">Economic Impact of Conservation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <h4 className="font-semibold text-green-700 mb-2">Ecotourism</h4>
            <div className="text-2xl font-bold text-green-800 mb-1">{economicImpact.ecotourism.revenue}</div>
            <div className="text-sm text-gray-600">{economicImpact.ecotourism.employment}</div>
            <div className="text-xs text-green-600 mt-1">{economicImpact.ecotourism.growth} growth</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <h4 className="font-semibold text-green-700 mb-2">Ecosystem Services</h4>
            <div className="text-2xl font-bold text-green-800 mb-1">{economicImpact.ecosystemServices.value}</div>
            <div className="text-sm text-gray-600">Annual value</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <h4 className="font-semibold text-green-700 mb-2">Forest Products</h4>
            <div className="text-2xl font-bold text-green-800 mb-1">{economicImpact.forestProducts.value}</div>
            <div className="text-sm text-gray-600">Annual value</div>
          </div>
        </div>
      </div>

      {/* Future Goals Section */}
      <div className="mt-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6 border border-indigo-300">
        <h3 className="text-2xl font-bold text-indigo-800 mb-4 text-center">Future Conservation Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureGoals.map((goal, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-indigo-700 mb-2">{goal.goal}</h4>
              <div className="text-sm text-gray-600 mb-3">
                Target: <span className="font-medium">{goal.target}</span>
                {goal.current && <span className="ml-2">(Current: {goal.current})</span>}
              </div>
              <div className="space-y-1">
                {goal.strategies.map((strategy, idx) => (
                  <div key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-indigo-600 mr-2">→</span>
                    {strategy}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConservationImpact;