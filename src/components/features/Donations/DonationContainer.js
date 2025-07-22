import { useState } from 'react';
import CausesList from './CausesList';
import OrganizationCard from './OrganizationCard';
import ImpactTracker from './ImpactTracker';

const DonationContainer = ({ 
  view = 'causes', // 'causes', 'organizations', 'impact'
  featured = false,
  category = null,
  limit = null,
  showNavigation = true // New prop to control navigation visibility
}) => {
  const [activeView, setActiveView] = useState(view);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrganizations = async () => {
    if (organizations.length > 0) return; // Already loaded
    
    try {
      setLoading(true);
      const response = await fetch('/api/donations/organizations');
      if (!response.ok) {
        throw new Error('Failed to load organizations');
      }
      const data = await response.json();
      setOrganizations(data);
    } catch (err) {
      console.error('Error loading organizations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewChange = (newView) => {
    setActiveView(newView);
    if (newView === 'organizations') {
      loadOrganizations();
    }
  };

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      {showNavigation && (
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
            <button
              onClick={() => handleViewChange('causes')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeView === 'causes'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Donation Causes
            </button>
            <button
              onClick={() => handleViewChange('organizations')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeView === 'organizations'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Organizations
            </button>
            <button
              onClick={() => handleViewChange('impact')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeView === 'impact'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Impact Tracker
            </button>
          </div>
        </div>
      )}

      {/* Content based on active view */}
      <div className="min-h-[400px]">
        {activeView === 'causes' && (
          <CausesList 
            featured={featured}
            category={category}
            limit={limit}
          />
        )}

        {activeView === 'organizations' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Verified Conservation Organizations
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Learn about the organizations working to protect India's forests and wildlife. 
                All organizations are verified and legally registered.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-96"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {organizations.map((org) => (
                  <OrganizationCard key={org.id} organization={org} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeView === 'impact' && (
          <ImpactTracker 
            showDonationBreakdown={true}
            showSuccessStories={true}
          />
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">
          Ready to Make a Difference?
        </h3>
        <p className="text-lg mb-6 opacity-90">
          Every donation directly supports forest conservation and wildlife protection efforts across India.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleViewChange('causes')}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Donation Causes
          </button>
          <button
            onClick={() => handleViewChange('impact')}
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
          >
            See Impact Data
          </button>
        </div>
      </div>

      {/* Trust and Security Notice */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h4 className="text-lg font-semibold text-gray-900">Secure & Verified</h4>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          All organizations are verified and registered. Donations are processed through official organization websites. 
          We do not handle any financial transactions directly - you donate securely through trusted organization platforms.
        </p>
      </div>
    </div>
  );
};

export default DonationContainer;