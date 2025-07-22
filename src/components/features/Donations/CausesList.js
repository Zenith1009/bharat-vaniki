import { useState, useEffect } from 'react';
import CauseCard from './CauseCard';

const CausesList = ({ featured = false, category = null, limit = null }) => {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCauses = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/donations/causes');
        if (!response.ok) {
          throw new Error('Failed to load donation causes');
        }
        const data = await response.json();
        
        let filteredCauses = data;
        
        // Filter by featured status
        if (featured) {
          filteredCauses = filteredCauses.filter(cause => cause.featured);
        }
        
        // Filter by category
        if (category) {
          filteredCauses = filteredCauses.filter(cause => 
            cause.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        // Limit results
        if (limit) {
          filteredCauses = filteredCauses.slice(0, limit);
        }
        
        setCauses(filteredCauses);
      } catch (err) {
        setError(err.message);
        console.error('Error loading donation causes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCauses();
  }, [featured, category, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Unable to Load Donation Causes
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (causes.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Causes Found
          </h3>
          <p className="text-gray-600">
            {category 
              ? `No donation causes found in the "${category}" category.`
              : 'No donation causes are currently available.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {featured && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Conservation Causes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Support verified forest conservation organizations making a real impact 
            in protecting India's biodiversity and ecosystems.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {causes.map((cause) => (
          <CauseCard key={cause.id} cause={cause} />
        ))}
      </div>
      
      {causes.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            All organizations are verified and registered. 
            Donations go directly to official organization websites.
          </p>
        </div>
      )}
    </div>
  );
};

export default CausesList;