import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const allDestinations = [
  { id: 1, name: "Goa", type: "Beach", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400", rating: 4.8, price: "₹8,000", desc: "Sun, sand and seafood — Goa is India's ultimate beach paradise." },
  { id: 2, name: "Manali", type: "Mountain", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400", rating: 4.7, price: "₹10,000", desc: "Snow-capped peaks and adventure sports in the heart of Himachal." },
  { id: 3, name: "Jaipur", type: "Heritage", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400", rating: 4.6, price: "₹6,000", desc: "The Pink City — forts, palaces and royal Rajasthani culture." },
  { id: 4, name: "Kerala", type: "Nature", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400", rating: 4.9, price: "₹12,000", desc: "God's Own Country — backwaters, spices and lush greenery." },
  { id: 5, name: "Agra", type: "Heritage", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400", rating: 4.7, price: "₹5,000", desc: "Home to the iconic Taj Mahal — a wonder of the world." },
  { id: 6, name: "Andaman", type: "Beach", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400", rating: 4.9, price: "₹18,000", desc: "Crystal clear waters and pristine beaches far from the mainland." },
  { id: 7, name: "Rishikesh", type: "Adventure", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400", rating: 4.7, price: "₹7,000", desc: "Yoga capital of the world with thrilling river rafting on the Ganges." },
  { id: 8, name: "Varanasi", type: "Heritage", img: "https://images.unsplash.com/photo-1561361058-c24e01dc5c8a?w=400", rating: 4.6, price: "₹4,500", desc: "One of the world's oldest cities — spiritual and deeply cultural." },
  { id: 9, name: "Coorg", type: "Nature", img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400", rating: 4.8, price: "₹9,000", desc: "Scotland of India — misty hills, coffee plantations and waterfalls." },
]

const filters = ["All", "Beach", "Mountain", "Heritage", "Nature", "Adventure"]

const Destinations = () => {
  const location = useLocation()
  const [active, setActive] = useState("All")
  const [search, setSearch] = useState(location.state?.search || '')
  const navigate = useNavigate()

  const filtered = allDestinations.filter(d => {
    const matchType = active === "All" || d.type === active
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-blue-700 text-white py-14 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-3">Explore Destinations</h1>
        <p className="text-blue-200 text-lg">Find your perfect getaway across India</p>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-6 py-3 rounded-full text-gray-800 w-80 shadow-lg text-lg outline-none"
          />
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap justify-center gap-3 py-8 px-6">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
              active === f
                ? "bg-blue-700 text-white shadow-md scale-105"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 text-xl py-20">No destinations found 😕</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(dest => (
              <div
                key={dest.id}
                onClick={() => navigate(`/destinations/${dest.id}`)}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="relative">
                  <img src={dest.img} alt={dest.name} className="w-full h-48 object-cover" />
                  <span className="absolute top-3 right-3 bg-white text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {dest.type}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{dest.name}</h3>
                    <span className="text-yellow-500 font-semibold">⭐ {dest.rating}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{dest.desc}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-400 text-xs">Starting from</span>
                      <div className="text-blue-700 font-bold text-lg">{dest.price}</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate('/booking', { state: { destination: dest.name } }) }}
                      className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-sm transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>



    </div>
  )
}

export default Destinations