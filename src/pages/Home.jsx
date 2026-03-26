import { useNavigate } from 'react-router-dom'

const destinations = [
  { id: 1, name: "Goa", type: "Beach", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400", rating: 4.8, price: "₹8,000" },
  { id: 2, name: "Manali", type: "Mountain", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400", rating: 4.7, price: "₹10,000" },
  { id: 3, name: "Jaipur", type: "Heritage", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400", rating: 4.6, price: "₹6,000" },
  { id: 4, name: "Kerala", type: "Nature", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400", rating: 4.9, price: "₹12,000" },
  { id: 5, name: "Agra", type: "Heritage", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400", rating: 4.7, price: "₹5,000" },
  { id: 6, name: "Andaman", type: "Beach", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400", rating: 4.9, price: "₹18,000" },
]

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div
        className="relative h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">Explore India</h1>
          <p className="text-xl mb-8 text-gray-200">Discover breathtaking destinations across the country</p>

          {/* SEARCH BAR */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="px-6 py-4 rounded-full text-white placeholder:text-gray-400 text-lg w-80 shadow-lg outline-3 focus:outline-blue-500 transition"
            />
            <button
              onClick={() => navigate('/destinations')}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-full text-lg shadow-lg transition"
            >
              Search 🔍
            </button>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="bg-blue-700 text-white py-6 px-8 flex justify-around flex-wrap gap-4">
        {[["500+", "Destinations"], ["50K+", "Happy Travelers"], ["200+", "Tour Packages"], ["24/7", "Support"]].map(([num, label]) => (
          <div key={label} className="text-center">
            <div className="text-3xl font-bold">{num}</div>
            <div className="text-blue-200">{label}</div>
          </div>
        ))}
      </div>

      {/* FEATURED DESTINATIONS */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Featured Destinations</h2>
        <p className="text-center text-gray-500 mb-10">Handpicked places you'll absolutely love</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map(dest => (
            <div
              key={dest.id}
              onClick={() => navigate('/destinations')}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img src={dest.img} alt={dest.name} className="w-full h-48 object-cover" />
              <div className="p-5">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl font-bold text-gray-800">{dest.name}</h3>
                  <span className="text-yellow-500 font-semibold">⭐ {dest.rating}</span>
                </div>
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{dest.type}</span>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-500 text-sm">Starting from</span>
                  <span className="text-blue-700 font-bold text-lg">{dest.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY US */}
      <div className="bg-blue-50 py-16 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Why Choose WanderIndia?</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            ["🏆", "Best Price Guarantee", "We match any price you find elsewhere"],
            ["🛡️", "Safe & Secure Booking", "Your payments and data are fully protected"],
            ["🎯", "Curated Experiences", "Every package is handpicked by travel experts"],
          ].map(([icon, title, desc]) => (
            <div key={title} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
              <p className="text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-300 text-center py-6">
        <p className="text-lg font-semibold text-white mb-1">🌍 WanderIndia</p>
        <p className="text-sm">© 2026 WanderIndia. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default Home