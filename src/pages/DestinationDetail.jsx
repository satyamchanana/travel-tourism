import { useParams, useNavigate } from 'react-router-dom'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY
const mapContainerStyle = { width: '100%', height: '400px' }

const DestinationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dest, setDest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, 'destinations', id))
      if (snap.exists()) setDest({ id: snap.id, ...snap.data() })
      setLoading(false)
    }
    fetch()
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-bounce">🗺️</div>
        <p className="text-gray-400 font-medium">Loading destination...</p>
      </div>
    </div>
  )

  if (!dest) return (
    <div className="min-h-screen flex items-center justify-center text-2xl text-gray-400">
      Destination not found 😕
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${dest.img}')` }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16">
          <button onClick={() => navigate('/destinations')}
            className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full backdrop-blur-sm transition text-sm font-semibold">
            ← Back
          </button>
          <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full w-fit mb-3">{dest.type}</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2">{dest.name}</h1>
          <div className="flex gap-4 items-center flex-wrap">
            <span className="text-yellow-400 text-xl font-bold">⭐ {dest.rating}</span>
            <span className="text-white text-lg">Starting from <strong>{dest.price?.toLocaleString()}</strong></span>
            <span className="text-blue-200">🕒 {dest.duration}</span>
            <span className="text-blue-200">📅 Best: {dest.bestTime}</span>
          </div>
        </div>
      </div>

      {/* TABS */}
<div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-16 z-40">
  <div className="max-w-6xl mx-auto px-6 flex gap-2 overflow-x-auto">
    {['overview', 'spots', 'map'].map(tab => (
      <button key={tab} onClick={() => setActiveTab(tab)}
        className={`px-6 py-4 font-semibold capitalize text-sm border-b-2 transition whitespace-nowrap ${
          activeTab === tab
            ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
        }`}>
        {tab === 'overview' ? '📋 Overview' : tab === 'spots' ? '📍 Tourist Spots' : '🗺️ Map'}
      </button>
    ))}
  </div>
</div>

<div className="max-w-6xl mx-auto px-6 py-10 bg-[#F8F9FA] dark:bg-gray-950 min-h-screen transition-colors">

  {/* OVERVIEW TAB */}
  {activeTab === 'overview' && (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">About {dest.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">{dest.desc}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Highlights</h2>
          <div className="flex flex-wrap gap-2">
            {dest.highlights?.map(h => (
              <span key={h} className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-medium text-sm border border-blue-100 dark:border-blue-800">
                ✓ {h}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Top Tourist Spots</h2>
          <div className="flex flex-col gap-3">
            {dest.spots?.map((spot, i) => (
              <div key={spot.name}
                className="flex gap-4 items-start p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/20 transition cursor-pointer"
                onClick={() => { setActiveTab('map'); setSelectedSpot(spot) }}>
                <div className="bg-[#1B3B6F] dark:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">{spot.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">{spot.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="flex flex-col gap-4">
        <div className="bg-[#1B3B6F] dark:bg-blue-900 text-white rounded-2xl p-6">
          <div className="text-3xl font-extrabold mb-1">₹{dest.price?.toLocaleString()}</div>
          <div className="text-blue-200 text-sm mb-4">Per person (starting from)</div>
          <button onClick={() => navigate('/booking', { state: { destination: dest.name } })}
            className="w-full bg-white dark:bg-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500 text-[#1B3B6F] dark:text-white font-bold py-3 rounded-xl transition text-base">
            Book Now 🚀
          </button>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col gap-4">
          <h3 className="font-bold text-gray-800 dark:text-white text-lg">Trip Info</h3>
          {[
            ["📅", "Best Time", dest.bestTime],
            ["🕒", "Duration", dest.duration],
            ["🏷️", "Category", dest.type],
            ["⭐", "Rating", `${dest.rating} / 5`],
          ].map(([icon, label, value]) => (
            <div key={label} className="flex justify-between items-center border-b border-gray-50 dark:border-gray-800 pb-2 last:border-0 last:pb-0">
              <span className="text-gray-500 dark:text-gray-400 text-sm">{icon} {label}</span>
              <span className="font-semibold text-gray-800 dark:text-white text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}

  {/* TOURIST SPOTS TAB */}
  {activeTab === 'spots' && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dest.spots?.map((spot, i) => (
        <div key={spot.name}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          onClick={() => { setActiveTab('map'); setSelectedSpot(spot) }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#1B3B6F] dark:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {i + 1}
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white text-lg">{spot.name}</h3>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{spot.desc}</p>
          <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-semibold">View on map →</div>
        </div>
      ))}
    </div>
  )}

  {/* MAP TAB */}
  {activeTab === 'map' && (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <LoadScript googleMapsApiKey={MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat: dest.lat, lng: dest.lng }} zoom={11}>
            {dest.spots?.map(spot => (
              <Marker key={spot.name} position={{ lat: spot.lat, lng: spot.lng }}
                title={spot.name} onClick={() => setSelectedSpot(spot)} />
            ))}
            {selectedSpot && (
              <InfoWindow position={{ lat: selectedSpot.lat, lng: selectedSpot.lng }}
                onCloseClick={() => setSelectedSpot(null)}>
                <div className="p-1 max-w-xs">
                  <h3 className="font-bold text-gray-800 text-base mb-1">{selectedSpot.name}</h3>
                  <p className="text-gray-600 text-sm">{selectedSpot.desc}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dest.spots?.map((spot, i) => (
          <div key={spot.name} onClick={() => setSelectedSpot(spot)}
            className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${
              selectedSpot?.name === spot.name
                ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700'
            }`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#1B3B6F] dark:bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">{i + 1}</span>
              <span className="font-semibold text-gray-800 dark:text-white text-sm">{spot.name}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{spot.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

    </div>
  )
}

export default DestinationDetail