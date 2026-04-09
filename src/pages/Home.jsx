import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const destinations = [
  { id: 1, name: "Goa", type: "Beach", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400", rating: 4.8, price: "₹8,000" },
  { id: 2, name: "Manali", type: "Mountain", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400", rating: 4.7, price: "₹10,000" },
  { id: 3, name: "Jaipur", type: "Heritage", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400", rating: 4.67, price: "₹6,000" },
  { id: 4, name: "Kerala", type: "Nature", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400", rating: 4.9, price: "₹12,000" },
  { id: 5, name: "Agra", type: "Heritage", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400", rating: 4.7, price: "₹5,000" },
  { id: 6, name: "Andaman", type: "Beach", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400", rating: 4.9, price: "₹18,000" },
  { id: 7, name: "Rishikesh", type: "Adventure", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400", rating: 4.7, price: "₹7,000" },
  { id: 8, name: "Varanasi", type: "Heritage", img: "https://images.unsplash.com/photo-1561361058-c24e01dc5c8a?w=400", rating: 4.6, price: "₹4,500" },
  { id: 9, name: "Coorg", type: "Nature", img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400", rating: 4.8, price: "₹9,000" },
  { id: 10, name: "Shimla", type: "Mountain", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400", rating: 4.6, price: "₹8,500" },
  { id: 11, name: "Ladakh", type: "Adventure", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400", rating: 4.9, price: "₹15,000" },
  { id: 12, name: "Mysore", type: "Heritage", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400", rating: 4.7, price: "₹6,500" },
]

const Home = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate('/destinations', { state: { search } })
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="relative h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <p className="text-blue-300 font-semibold text-lg mb-2 tracking-widest uppercase">Discover India</p>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight">
            Your Next Adventure<br />Starts Here
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-xl mx-auto">
            Explore breathtaking destinations, book curated packages and create memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center border-gray-300">
            <input type="text" placeholder="Where do you want to go?"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="px-6 py-4 rounded-full text-gray-800 text-lg w-80 shadow-lg outline-none" />
            <button onClick={handleSearch}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-full text-lg shadow-lg transition hover:scale-105">
              Search 🔍
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map(dest => (
            <div key={dest.id} onClick={() => navigate(`/destinations/${dest.id}`)}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img src={dest.img} alt={dest.name} className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 right-3 bg-white/90 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                  {dest.type}
                </span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{dest.name}</h3>
                  <span className="text-yellow-500 text-sm font-semibold">⭐ {dest.rating}</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-blue-700 font-bold">{dest.price}</span>
                  <span className="text-xs text-gray-400">per person</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => navigate('/destinations')}
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-10 py-4 rounded-full text-lg transition hover:scale-105">
            View All Destinations →
          </button>
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
            <div key={title} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
              <p className="text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA BANNER */}
      <div className="bg-blue-700 py-16 px-6 text-center text-white">
        <h2 className="text-4xl font-extrabold mb-3">Ready to Start Your Journey?</h2>
        <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
          Join thousands of happy travelers who discovered India with WanderIndia.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={() => navigate('/packages')}
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition hover:scale-105">
            View Packages 📦
          </button>
          <button onClick={() => navigate('/contact')}
            className="bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-4 rounded-full text-lg transition">
            Contact Us 💬
          </button>
        </div>
      </div>

    </div>
  )
}

export default Home