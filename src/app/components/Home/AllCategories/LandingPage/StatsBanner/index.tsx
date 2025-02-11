export default function StatsBanner() {
  return (
    <section className="w-full bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-between space-y-8 text-center md:flex-row md:space-y-0 md:text-left">
          {/* Left Section */}
          <div>
            <p className="text-lg md:text-xl font-medium">
              Trusted by Over <span className="font-bold text-orange-500">22,000+</span> Clients WorldWide
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-16">
            {/* Stat 1 */}
            <div>
              <h3 className="text-4xl font-bold">15k</h3>
              <p className="text-gray-400">Total Verified Listings</p>
            </div>
            {/* Stat 2 */}
            <div>
              <h3 className="text-4xl font-bold">40k</h3>
              <p className="text-gray-400">Our Happy Clients</p>
            </div>
            {/* Stat 3 */}
            <div>
              <h3 className="text-4xl font-bold">5.6k</h3>
              <p className="text-gray-400">Places In The World</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
