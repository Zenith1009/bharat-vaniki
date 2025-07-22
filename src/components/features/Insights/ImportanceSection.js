import React, { useState } from 'react';
import { forestImportance } from '../../../data/insights/forestImportance';

const ImportanceSection = () => {
  const [activeSection, setActiveSection] = useState('importance');
  const { keyImportance, ecosystemServices, forestTypeImportance, globalContext, futureImportance, callToAction } = forestImportance;

  const sections = [
    { id: 'importance', label: 'Why Forests Matter', icon: '🌳' },
    { id: 'services', label: 'Ecosystem Services', icon: '🔄' },
    { id: 'types', label: 'Forest Types', icon: '🌲' },
    { id: 'global', label: 'Global Context', icon: '🌍' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Understanding Forest Importance
      </h2>
      
      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center mb-8 border-b border-green-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 mx-2 mb-2 rounded-t-lg font-medium transition-colors duration-300 ${
              activeSection === section.id
                ? 'bg-green-600 text-white border-b-2 border-green-600'
                : 'text-green-600 hover:bg-green-50'
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Why Forests Matter Section */}
      {activeSection === 'importance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyImportance.map((importance, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 hover:shadow-md transition-shadow duration-300">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{importance.icon}</div>
                  <h3 className="text-xl font-bold text-green-800">{importance.title}</h3>
                </div>
                
                <p className="text-gray-700 mb-4 text-sm">{importance.description}</p>
                
                <div className="bg-white rounded-lg p-3 shadow-sm mb-4">
                  <h4 className="font-semibold text-green-700 mb-2 text-sm">Key Details</h4>
                  <ul className="space-y-1">
                    {importance.details.slice(0, 3).map((detail, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start">
                        <span className="text-green-600 mr-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-green-100 rounded-lg p-3">
                  <div className="text-xs font-medium text-green-800 mb-2">Impact Statistics</div>
                  {Object.entries(importance.statistics).slice(0, 2).map(([key, value]) => (
                    <div key={key} className="text-xs text-green-700 mb-1">
                      <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span> {value}
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 text-center">
                  <div className="text-xs font-medium text-green-800 bg-green-200 rounded-full px-3 py-1">
                    {importance.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ecosystem Services Section */}
      {activeSection === 'services' && (
        <div className="space-y-6">
          {ecosystemServices.map((service, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-xl font-bold text-blue-800 mb-3">{service.service}</h3>
                    <p className="text-gray-700 text-sm mb-3">{service.description}</p>
                    <div className="text-xs text-blue-700 bg-blue-100 rounded-lg p-2">
                      <strong>How it works:</strong> {service.mechanism}
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Global Impact */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-blue-700 mb-2">Global Impact</h4>
                      <div className="text-sm text-gray-700 mb-3">{service.globalImpact}</div>
                      
                      <h5 className="font-medium text-blue-600 mb-2 text-sm">Indian Context</h5>
                      {Object.entries(service.indianContext).map(([key, value]) => (
                        <div key={key} className="text-xs text-gray-600 mb-1">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}
                        </div>
                      ))}
                    </div>
                    
                    {/* Benefits */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-blue-700 mb-2">Key Benefits</h4>
                      <ul className="space-y-1">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-start">
                            <span className="text-blue-600 mr-1">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Forest Types Section */}
      {activeSection === 'types' && (
        <div className="space-y-6">
          {forestTypeImportance.map((forestType, index) => (
            <div key={index} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-xl font-bold text-amber-800 mb-2">{forestType.type}</h3>
                    <div className="text-sm text-gray-600 mb-3">
                      <strong>Locations:</strong> {forestType.locations.join(', ')}
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full text-center ${
                      forestType.conservationPriority === 'Very High' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      Priority: {forestType.conservationPriority}
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Unique Features */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-amber-700 mb-2">Unique Features</h4>
                      <ul className="space-y-1">
                        {forestType.uniqueFeatures.map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-start">
                            <span className="text-amber-600 mr-1">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Importance */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-amber-700 mb-2">Ecological Importance</h4>
                      <ul className="space-y-1">
                        {forestType.importance.map((importance, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-start">
                            <span className="text-amber-600 mr-1">✓</span>
                            {importance}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Threats */}
                  <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
                    <h4 className="font-semibold text-red-700 mb-2">Current Threats</h4>
                    <div className="flex flex-wrap gap-2">
                      {forestType.threats.map((threat, idx) => (
                        <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                          {threat}
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

      {/* Global Context Section */}
      {activeSection === 'global' && (
        <div className="space-y-6">
          {/* India's Global Ranking */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4 text-center">India's Global Standing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(globalContext.indiaRanking).map(([key, value]) => (
                <div key={key} className="bg-white rounded-lg p-4 shadow-sm text-center">
                  <h4 className="font-semibold text-indigo-700 mb-2 text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </h4>
                  <div className="text-lg font-bold text-indigo-800">{value}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Global Contribution */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">India's Global Contribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(globalContext.globalContribution).map(([key, value]) => (
                <div key={key} className="bg-white rounded-lg p-4 shadow-sm text-center">
                  <h4 className="font-semibold text-green-700 mb-2 text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </h4>
                  <div className="text-lg font-bold text-green-800">{value}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* International Commitments */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">International Commitments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {globalContext.internationalCommitments.map((commitment, index) => (
                <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-sm text-blue-700 font-medium">{commitment}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Future Importance Section */}
      <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 border border-purple-300">
        <h3 className="text-2xl font-bold text-purple-800 mb-4 text-center">Future Importance & Challenges</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Climate Change */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-purple-700 mb-3">Climate Change Role</h4>
            <p className="text-sm text-gray-700 mb-3">{futureImportance.climateChange.role}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="font-medium text-green-600 mb-2 text-sm">Potential</h5>
                <ul className="space-y-1">
                  {futureImportance.climateChange.potential.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start">
                      <span className="text-green-600 mr-1">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-600 mb-2 text-sm">Challenges</h5>
                <ul className="space-y-1">
                  {futureImportance.climateChange.challenges.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start">
                      <span className="text-red-600 mr-1">!</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Sustainable Development */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-purple-700 mb-3">Sustainable Development</h4>
            <p className="text-sm text-gray-700 mb-3">{futureImportance.sustainableDevelopment.role}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="font-medium text-blue-600 mb-2 text-sm">Contributions</h5>
                <ul className="space-y-1">
                  {futureImportance.sustainableDevelopment.contributions.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start">
                      <span className="text-blue-600 mr-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-orange-600 mb-2 text-sm">Opportunities</h5>
                <ul className="space-y-1">
                  {futureImportance.sustainableDevelopment.opportunities.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start">
                      <span className="text-orange-600 mr-1">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-8 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg p-6 border border-emerald-300">
        <h3 className="text-2xl font-bold text-emerald-800 mb-4 text-center">How You Can Help</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(callToAction).map(([category, actions]) => (
            <div key={category} className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-emerald-700 mb-3 capitalize text-center">{category}</h4>
              <ul className="space-y-2">
                {actions.map((action, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start">
                    <span className="text-emerald-600 mr-1">•</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Call to Action */}
      <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-8 text-white text-center shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-green-200 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <h3 className="text-3xl font-bold">Make a Real Impact Today</h3>
          </div>
          
          <p className="text-xl text-green-100 mb-6">
            Understanding forest importance is just the beginning. Your support can help protect these vital ecosystems for future generations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">₹500</div>
              <div className="text-sm text-green-100">Plants 50 native tree saplings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">₹2,500</div>
              <div className="text-sm text-green-100">Rescues & rehabilitates 1 wildlife</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-2">₹10,000</div>
              <div className="text-sm text-green-100">Supports village conservation for 1 year</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-300 transform hover:scale-105"
            >
              🌱 Donate Now
            </a>
            <a
              href="/organizations"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300 transform hover:scale-105"
            >
              View Organizations
            </a>
          </div>
          
          <div className="mt-6 text-sm text-green-100">
            <p>✓ All organizations verified  ✓ 100% secure donations  ✓ Tax benefits available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportanceSection;