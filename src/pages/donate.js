import Head from 'next/head';
import DonationContainer from '../components/features/Donations/DonationContainer';

export default function DonatePage() {

  return (
    <>
      <Head>
        <title>Support Forest Conservation - Donate to Verified Organizations</title>
        <meta 
          name="description" 
          content="Support real forest conservation efforts in India. Donate to verified organizations working to protect wildlife, restore habitats, and engage communities in sustainable practices." 
        />
        <meta name="keywords" content="forest conservation donation, wildlife protection India, environmental NGO, forest restoration, biodiversity conservation" />
        <meta property="og:title" content="Support Forest Conservation - Donate to Verified Organizations" />
        <meta property="og:description" content="Make a real impact on forest conservation in India. Support verified organizations protecting wildlife and restoring ecosystems." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/donate" />
      </Head>

      <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-green-600 via-green-700 to-blue-600 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Protect India's Forests
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  Support verified conservation organizations making a real difference 
                  in protecting our forests, wildlife, and communities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl font-bold mb-2">3.2M+</div>
                    <div className="text-sm opacity-90">Hectares Protected</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl font-bold mb-2">56.5M+</div>
                    <div className="text-sm opacity-90">Trees Planted</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl font-bold mb-2">185K+</div>
                    <div className="text-sm opacity-90">Families Supported</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust and Security Banner */}
          <section className="bg-white border-b">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-center">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-medium">All Organizations Verified</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-4 4-4-4 4-4 .257-.257A6 6 0 1118 8zm-6-2a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-medium">Secure External Donations</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 font-medium">100% Transparent Impact</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <DonationContainer view="causes" featured={true} showNavigation={false} />
            </div>
          </section>

          {/* How It Works Section */}
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  How Your Donation Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose a Cause</h3>
                    <p className="text-gray-600">
                      Select from verified forest conservation organizations and specific projects 
                      that align with your values and interests.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Donate Securely</h3>
                    <p className="text-gray-600">
                      Click "Donate Now" to be redirected to the organization's official website 
                      for secure payment processing.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Impact</h3>
                    <p className="text-gray-600">
                      Receive updates from organizations and see the real impact of your 
                      contribution through our impact tracking system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      How do I know my donation is secure?
                    </h3>
                    <p className="text-gray-600">
                      All donations are processed through the official websites of verified organizations. 
                      We don't handle any financial transactions directly - you donate securely through 
                      trusted organization platforms with proper SSL encryption and security measures.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      How are organizations verified?
                    </h3>
                    <p className="text-gray-600">
                      All organizations are verified through multiple criteria: legal registration status, 
                      FCRA compliance, financial transparency ratings, third-party audits, and proven 
                      track records in conservation work. We regularly review and update verification status.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Can I get tax benefits for my donation?
                    </h3>
                    <p className="text-gray-600">
                      Yes, all listed organizations have 80G tax exemption status, making your donations 
                      eligible for tax deductions under Indian Income Tax Act. You'll receive tax receipts 
                      directly from the organizations.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      How can I track the impact of my donation?
                    </h3>
                    <p className="text-gray-600">
                      Organizations provide regular impact reports and updates. You can also check our 
                      Impact Tracker section to see overall conservation achievements and how donations 
                      are being utilized across different programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
      </div>
    </>
  );
}