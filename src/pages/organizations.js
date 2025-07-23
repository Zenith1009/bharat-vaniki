import Head from 'next/head';
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

        {/* Main Content with Navigation Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <DonationContainer view="organizations" showNavigation={true} />
          </div>
        </section>
      </div>
    </>
  );
}