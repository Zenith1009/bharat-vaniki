import Head from 'next/head';
import Layout from '../components/layout/Layout';
import DonationContainer from '../components/features/Donations/DonationContainer';

export default function OrganizationsPage() {
  return (
    <>
      <Head>
        <title>Verified Conservation Organizations - Forest Protection India</title>
        <meta 
          name="description" 
          content="Learn about verified forest conservation organizations in India. Discover their programs, impact, and how they're protecting wildlife and ecosystems across the country." 
        />
        <meta name="keywords" content="conservation organizations India, forest NGO, wildlife protection, environmental organizations, verified charities" />
        <meta property="og:title" content="Verified Conservation Organizations - Forest Protection India" />
        <meta property="og:description" content="Discover verified organizations working to protect India's forests and wildlife. Learn about their programs and impact." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/organizations" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-green-600 via-green-700 to-blue-600 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Conservation Organizations
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  Meet the verified organizations working tirelessly to protect India's 
                  forests, wildlife, and ecosystems for future generations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl font-bold mb-2">5+</div>
                    <div className="text-sm opacity-90">Verified Organizations</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <div className="text-sm opacity-90">Transparency Rating</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-sm opacity-90">Years Combined Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Verification Standards */}
          <section className="bg-white py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                  Our Verification Standards
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Registration</h3>
                    <p className="text-gray-600 text-sm">
                      All organizations are legally registered NGOs with proper documentation and compliance.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Transparency</h3>
                    <p className="text-gray-600 text-sm">
                      Verified financial ratings and transparent reporting of fund utilization.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Impact</h3>
                    <p className="text-gray-600 text-sm">
                      Documented conservation achievements and measurable environmental impact.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-4 4-4-4 4-4 .257-.257A6 6 0 1118 8zm-6-2a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Programs</h3>
                    <p className="text-gray-600 text-sm">
                      Currently running conservation programs with community engagement and results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Organizations List */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <DonationContainer view="organizations" />
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-green-600 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Support Conservation?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Choose an organization that aligns with your values and make a direct impact 
                on forest conservation in India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/donate"
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  View Donation Causes
                </a>
                <a
                  href="/donate"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  See Impact Tracker
                </a>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}