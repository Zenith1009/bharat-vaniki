import { useState, useEffect } from 'react';

const ImpactTracker = ({ showDonationBreakdown = true, showSuccessStories = true }) => {
  const [impactData, setImpactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState('₹1000');

  useEffect(() => {
    const loadImpactData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/donations/impact');
        if (!response.ok) {
          throw new Error('Failed to load impact data');
        }
        const data = await response.json();
        setImpactData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error loading impact data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadImpactData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Unable to Load Impact Data
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!impactData) return null;

  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-8">
      {/* Overall Impact Summary */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Conservation Impact Tracker
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          See the real impact of donations to forest conservation organizations. 
          All data is verified and updated regularly from official organization reports.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Last updated: {new Date(impactData.overallImpact.lastUpdated).toLocaleDateString()}
        </p>
      </div>

      {/* Overall Impact Metrics */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Total Conservation Impact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {impactData.overallImpact.totalDonationsTracked}
            </div>
            <div className="text-sm text-gray-600">Total Donations Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {impactData.overallImpact.forestsProtected}
            </div>
            <div className="text-sm text-gray-600">Forests Protected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {impactData.overallImpact.treesPlanted}
            </div>
            <div className="text-sm text-gray-600">Trees Planted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {impactData.overallImpact.communitiesSupported}
            </div>
            <div className="text-sm text-gray-600">Communities Supported</div>
          </div>
        </div>
      </div>

      {/* Impact by Category */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Impact by Conservation Area</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {impactData.impactCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{category.category}</h4>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {category.totalFunding}
                </span>
              </div>
              <div className="space-y-3">
                {category.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="border-l-4 border-green-500 pl-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{metric.metric}</span>
                      <span className="text-lg font-bold text-green-600">{metric.value}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Impact Calculator */}
      {showDonationBreakdown && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Donation Impact</h3>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select donation amount to see impact:
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(impactData.donationBreakdown).map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedAmount === amount
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>
          
          {selectedAmount && impactData.donationBreakdown[selectedAmount] && (
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-800 mb-4">
                Impact of {selectedAmount} Donation
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Direct Impact</h5>
                  <p className="text-green-700">{impactData.donationBreakdown[selectedAmount].impact}</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Equivalent To</h5>
                  <p className="text-green-700">{impactData.donationBreakdown[selectedAmount].equivalentTo}</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Timeframe</h5>
                  <p className="text-green-700">{impactData.donationBreakdown[selectedAmount].timeframe}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Transparency Metrics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Financial Transparency</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Fund Utilization</h4>
            <div className="space-y-3">
              {Object.entries(impactData.transparencyMetrics.fundUtilization).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Reporting Standards</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Reporting Frequency:</span>
                <span className="font-semibold text-gray-900">{impactData.transparencyMetrics.reportingFrequency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Audit Frequency:</span>
                <span className="font-semibold text-gray-900">{impactData.transparencyMetrics.auditFrequency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Public Reporting:</span>
                <span className="font-semibold text-gray-900">{impactData.transparencyMetrics.publicReporting}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      {showSuccessStories && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Conservation Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactData.successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{story.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{story.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Funding:</span>
                    <span className="font-medium text-green-600">{story.funding}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Impact:</span>
                    <span className="font-medium text-green-600">{story.impact}</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-gray-500">Location:</span>
                    <p className="text-gray-700 font-medium">{story.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImpactTracker;