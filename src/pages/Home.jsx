import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const Home = () => {
  const [search, setSearch] = useState('')
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, 'destinations'))
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setDestinations(data)
      setLoading(false)
    }
    fetch()
  }, [])

  const handleSearch = () => navigate('/destinations', { state: { search } })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* HERO */}
      <div className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1736273828884-5e3f370bba64?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-blue-300 mb-5">
            ✦ Discover Incredible India ✦
          </p>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-5 leading-none tracking-tight">
            Travel Beyond<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              the Ordinary
            </span>
          </h1>
          <p className="text-base text-gray-300 mb-10 max-w-md mx-auto leading-relaxed">
            Curated destinations, thoughtful packages, seamless bookings — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input type="text"
              placeholder="Where do you want to go?"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="px-6 py-4 rounded-full text-gray-800 text-sm w-72 outline-none bg-white/95 shadow-xl" />
            <button onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full text-sm shadow-xl transition hover:scale-105">
              Search Destinations
            </button>
          </div>
          <div className="mt-6 flex gap-6 justify-center text-xs text-gray-400">
            {['Goa', 'Manali', 'Kerala', 'Ladakh'].map(d => (
              <button key={d} onClick={() => navigate('/destinations', { state: { search: d } })}
                className="hover:text-white transition">
                {d} →
              </button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs">
          <span>Scroll to explore</span>
          <div className="w-px h-10 bg-white/20 animate-pulse" />
        </div>
      </div>

      {/* STATS */}
      <div className="bg-[#1B3B6F] dark:bg-gray-900 dark:border-b dark:border-gray-800 text-white py-4">
        <div className="max-w-5xl mx-auto flex justify-around flex-wrap gap-4 px-6">
          {[["500+", "Destinations"], ["50K+", "Happy Travelers"], ["200+", "Packages"], ["24/7", "Support"]].map(([num, label]) => (
            <div key={label} className="text-center py-1">
              <div className="text-2xl font-extrabold">{num}</div>
              <div className="text-blue-300 dark:text-gray-400 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DESTINATIONS */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">✦ Explore</p>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Featured Destinations</h2>
          </div>
          <button onClick={() => navigate('/destinations')}
            className="hidden sm:block text-sm font-semibold text-[#1B3B6F] dark:text-blue-400 hover:text-blue-600 transition">
            View all →
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-2/3" />
                  <div className="bg-gray-100 dark:bg-gray-600 h-3 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {destinations.map(dest => (
              <div key={dest.id} onClick={() => navigate(`/destinations/${dest.id}`)}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden cursor-pointer group border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-xl dark:hover:shadow-blue-950 transition-all duration-300">
                <div className="relative overflow-hidden h-48">
                  <img src={dest.img} alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-[#1B3B6F] dark:text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full">
                    {dest.type}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <span className="text-white text-xs font-semibold">Tap to explore →</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{dest.name}</h3>
                    <span className="text-yellow-500 text-xs font-bold">⭐ {dest.rating}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">📅 {dest.bestTime}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50 dark:border-gray-800">
                    <span className="text-[#1B3B6F] dark:text-blue-400 font-extrabold text-sm">₹{dest.price?.toLocaleString()}</span>
                    <span className="text-xs text-gray-400">per person</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button onClick={() => navigate('/destinations')}
            className="bg-[#1B3B6F] dark:bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-full text-sm transition hover:scale-105 shadow-lg">
            View All Destinations →
          </button>
        </div>
      </div>

      {/* WHY US */}
      <div className="bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 py-20 px-6 transition-colors">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <p className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">✦ Why Us</p>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Travel with Confidence</h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            ["🏆", "Best Price Guarantee", "We match any price you find elsewhere, no questions asked."],
            ["🛡️", "Safe & Secure", "Your payments and data are always protected with us."],
            ["🎯", "Curated Experiences", "Every destination and package is handpicked by travel experts."],
          ].map(([icon, title, desc]) => (
            <div key={title} className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 px-6 text-center bg-white dark:bg-gray-950 transition-colors">
        <p className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-4">✦ Ready?</p>
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-5 leading-none">
          Your Next Trip<br />Awaits
        </h2>
        <p className="text-gray-400 text-base mb-10 max-w-md mx-auto">
          Join thousands of travelers who discovered India with WanderIndia.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={() => navigate('/destinations')}
            className="bg-[#1B3B6F] dark:bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-full transition hover:scale-105 shadow-lg text-sm">
            Explore Destinations
          </button>
          <button onClick={() => navigate('/packages')}
            className="border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold px-10 py-4 rounded-full hover:border-[#1B3B6F] dark:hover:border-blue-500 hover:text-[#1B3B6F] dark:hover:text-blue-400 transition text-sm">
            View Packages
          </button>
        </div>
      </div>

    </div>
  )
}

export default Home