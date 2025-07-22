import Image from 'next/image';
import { useState } from 'react';
import { openDonationLink } from '../../../lib/security';

const OrganizationCard = ({ organization, detailed = false }) => {
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getTrustScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatCurrency = (amount) => {
    return amount.replace(/₹(\d+)/, (match, number) => {
      const num = parseInt(number);
      if (num >= 100) return `₹${num} crores`;
      return match;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {/* Organization Logo */}
            <div className="w-16 h-16 relative">
              {!imageError ? (
                <Image
                  src={organization.logo}
                  alt={`${organization.name} logo`}
                  fill
                  className="object-contain rounded-lg"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {organization.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Organization Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900">{organization.name}</h3>
              <p className="text-sm text-gray-600">{organization.type}</p>
              <p className="text-xs text-gray-500">Est. {organization.established}</p>
            </div>
          </div>

          {/* Trust Score */}
          <div className="text-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTrustScoreColor(organization.trustScore)}`}>
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {organization.trustScore}%
            </div>
            <p className="text-xs text-gray-500 mt-1">Trust Score</p>
          </div>
        </div>

        {/* Mission Statement */}
        <p className="text-gray-700 mt-4 text-sm leading-relaxed">
          {organization.mission}
        </p>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Focus Areas */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Focus Areas</h4>
          <div className="flex flex-wrap gap-2">
            {organization.focusAreas.slice(0, 4).map((area, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >
                {area}
              </span>
            ))}
            {organization.focusAreas.length > 4 && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{organization.focusAreas.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Key Programs */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Programs</h4>
          <div className="space-y-3">
            {organization.keyPrograms.slice(0, 2).map((program, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-3">
                <h5 className="font-medium text-gray-900 text-sm">{program.name}</h5>
                <p className="text-xs text-gray-600 mt-1">{program.description}</p>
                <p className="text-xs text-green-600 font-medium mt-1">{program.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Financial Transparency</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Revenue:</span>
              <p className="font-medium">{formatCurrency(organization.financials.totalRevenue)}</p>
            </div>
            <div>
              <span className="text-gray-600">Rating:</span>
              <p className="font-medium text-yellow-600">{organization.financials.rating}</p>
            </div>
            <div>
              <span className="text-gray-600">Program Expenses:</span>
              <p className="font-medium text-green-600">{organization.financials.programExpenses}</p>
            </div>
            <div>
              <span className="text-gray-600">Admin Expenses:</span>
              <p className="font-medium">{organization.financials.adminExpenses}</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Certifications</h4>
          <div className="flex flex-wrap gap-2">
            {organization.certifications.slice(0, 3).map((cert, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-4">
          <button
            onClick={() => openDonationLink(organization.donationUrl, organization.name)}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Donate to {organization.name}
          </button>
        </div>

        {/* Contact and Social Media */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <a
                href={organization.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors"
                title="Website"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
              </a>
              {organization.socialMedia.facebook && (
                <a
                  href={organization.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  title="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {organization.socialMedia.twitter && (
                <a
                  href={organization.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 transition-colors"
                  title="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              )}
            </div>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              {showDetails ? 'Show Less' : 'View Details'}
            </button>
          </div>
        </div>

        {/* Detailed Information (Expandable) */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Email:</strong> {organization.contact.email}</p>
                <p><strong>Phone:</strong> {organization.contact.phone}</p>
                <p><strong>Address:</strong> {organization.contact.address}</p>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-2">All Programs</h5>
              <div className="space-y-2">
                {organization.keyPrograms.map((program, index) => (
                  <div key={index} className="text-sm">
                    <h6 className="font-medium text-gray-800">{program.name}</h6>
                    <p className="text-gray-600">{program.description}</p>
                    <p className="text-green-600 font-medium">{program.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationCard;