import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const filters = ["All", "Beach", "Mountain", "Heritage", "Nature", "Adventure"]

const Destinations = () => {
  const [active, setActive] = useState("All")
  const [search, setSearch] = useState('')
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.search) setSearch(location.state.search)
  }, [location.state])

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, 'destinations'))
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setDestinations(data)
      setLoading(false)
    }
    fetch()
  }, [])

  const filtered = destinations.filter(d => {
    const matchType = active === "All" || d.type === active
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950 transition-colors duration-300">

      {/* HEADER */}
      <div className="bg-[#1B3B6F] dark:bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">✦ Explore</p>
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">All Destinations</h1>
          <p className="text-blue-200 dark:text-gray-400 mb-8 text-sm">Discover incredible places across the length and breadth of India</p>
          <input type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-6 py-3.5 rounded-full text-gray-800 w-80 outline-none bg-white dark:bg-gray-800 dark:text-white shadow-md text-sm" />
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full font-semibold text-xs whitespace-nowrap transition-all ${
                active === f
                  ? 'bg-[#1B3B6F] dark:bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden animate-pulse border border-gray-100 dark:border-gray-800">
                <div className="bg-gray-200 dark:bg-gray-700 h-52 w-full" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-2/3" />
                  <div className="bg-gray-100 dark:bg-gray-800 h-3 rounded w-full" />
                  <div className="bg-gray-100 dark:bg-gray-800 h-3 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-400 text-xl font-medium">No destinations found</p>
            <p className="text-gray-300 dark:text-gray-600 text-sm mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">{filtered.length} destination{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(dest => (
                <div key={dest.id}
                  onClick={() => navigate(`/destinations/${dest.id}`)}
                  className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden cursor-pointer group border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden h-52">
                    <img src={dest.img} alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-[#1B3B6F] dark:text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full">
                      {dest.type}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white dark:bg-gray-900 text-[#1B3B6F] dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full shadow">
                        Explore →
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{dest.name}</h3>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">📅 {dest.bestTime} · 🕒 {dest.duration}</p>
                      </div>
                      <span className="text-yellow-500 text-sm font-semibold whitespace-nowrap ml-2">⭐ {dest.rating}</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">{dest.desc}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-50 dark:border-gray-800">
                      <div>
                        <p className="text-[#1B3B6F] dark:text-blue-400 font-extrabold text-lg">₹{dest.price?.toLocaleString()}</p>
                        <p className="text-gray-400 text-xs">per person</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate('/booking', { state: { destination: dest.name } }) }}
                        className="bg-[#1B3B6F] dark:bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold text-xs transition">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Destinations