import { useParams, useNavigate } from 'react-router-dom'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { useState } from 'react'

const MAPS_API_KEY = "AIzaSyCmQ2TwgmORwha1pH2GIyqlsgauQwJEG00"

const destinationsData = {
  1: {
    name: "Goa", type: "Beach", rating: 4.8, price: "₹8,000",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
    desc: "Sun, sand and seafood — Goa is India's ultimate beach paradise with Portuguese heritage, vibrant nightlife, and stunning coastlines stretching across North and South Goa.",
    lat: 15.2993, lng: 74.1240,
    spots: [
      { name: "Baga Beach", desc: "Most popular beach known for water sports and nightlife", lat: 15.5524, lng: 73.7515 },
      { name: "Basilica of Bom Jesus", desc: "UNESCO World Heritage Site, 16th century Portuguese church", lat: 15.5009, lng: 73.9117 },
      { name: "Fort Aguada", desc: "17th century Portuguese fort with a lighthouse and sea views", lat: 15.4891, lng: 73.7732 },
      { name: "Dudhsagar Falls", desc: "One of India's tallest waterfalls, deep in the Western Ghats", lat: 15.3144, lng: 74.3144 },
      { name: "Anjuna Flea Market", desc: "Iconic Wednesday market for clothes, jewelry and souvenirs", lat: 15.5738, lng: 73.7394 },
    ],
    bestTime: "November to February",
    duration: "4-6 Days",
    highlights: ["Water Sports", "Portuguese Architecture", "Beach Shacks", "Nightlife", "Spice Plantations"]
  },
  2: {
    name: "Manali", type: "Mountain", rating: 4.7, price: "₹10,000",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    desc: "Snow-capped peaks, lush valleys, and thrilling adventure sports make Manali one of India's most beloved hill stations nestled in the heart of Himachal Pradesh.",
    lat: 32.2432, lng: 77.1892,
    spots: [
      { name: "Rohtang Pass", desc: "High mountain pass at 3,978m with stunning snow views", lat: 32.3710, lng: 77.2448 },
      { name: "Solang Valley", desc: "Adventure hub for skiing, paragliding and zorbing", lat: 32.3195, lng: 77.1585 },
      { name: "Hadimba Temple", desc: "Ancient wooden temple surrounded by cedar forest", lat: 32.2396, lng: 77.1763 },
      { name: "Old Manali", desc: "Charming village with cafes, guesthouses and hippie culture", lat: 32.2539, lng: 77.1734 },
      { name: "Beas River", desc: "Scenic river perfect for rafting and riverside walks", lat: 32.2165, lng: 77.1927 },
    ],
    bestTime: "October to June",
    duration: "5-7 Days",
    highlights: ["Snow Activities", "Paragliding", "River Rafting", "Ancient Temples", "Apple Orchards"]
  },
  3: {
    name: "Jaipur", type: "Heritage", rating: 4.6, price: "₹6,000",
    img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
    desc: "The Pink City of India, Jaipur is a royal treasure trove of magnificent forts, ornate palaces, vibrant bazaars, and rich Rajasthani culture.",
    lat: 26.9124, lng: 75.7873,
    spots: [
      { name: "Amber Fort", desc: "Majestic fort-palace with stunning architecture and elephant rides", lat: 26.9855, lng: 75.8513 },
      { name: "Hawa Mahal", desc: "Iconic Palace of Winds with 953 small windows", lat: 26.9239, lng: 75.8267 },
      { name: "City Palace", desc: "Royal residence with museums, courtyards and beautiful art", lat: 26.9258, lng: 75.8237 },
      { name: "Jantar Mantar", desc: "UNESCO listed astronomical observatory built in the 18th century", lat: 26.9246, lng: 75.8242 },
      { name: "Johari Bazaar", desc: "Famous market for gemstones, jewelry and traditional Rajasthani crafts", lat: 26.9182, lng: 75.8228 },
    ],
    bestTime: "October to March",
    duration: "3-4 Days",
    highlights: ["Royal Forts", "Elephant Rides", "Rajasthani Cuisine", "Gem Shopping", "Cultural Shows"]
  },
  4: {
    name: "Kerala", type: "Nature", rating: 4.9, price: "₹12,000",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
    desc: "God's Own Country — Kerala enchants visitors with its serene backwaters, lush tea gardens, exotic wildlife, and rich cultural traditions.",
    lat: 10.8505, lng: 76.2711,
    spots: [
      { name: "Alleppey Backwaters", desc: "Iconic houseboat rides through tranquil canals and lagoons", lat: 9.4981, lng: 76.3388 },
      { name: "Munnar Tea Gardens", desc: "Rolling hills covered in lush green tea plantations", lat: 10.0889, lng: 77.0595 },
      { name: "Periyar Wildlife Sanctuary", desc: "Tiger reserve famous for elephants and boat safaris", lat: 9.4588, lng: 77.1567 },
      { name: "Kovalam Beach", desc: "Crescent-shaped beach popular for Ayurvedic resorts", lat: 8.3988, lng: 76.9782 },
      { name: "Fort Kochi", desc: "Historic area with Chinese fishing nets and colonial architecture", lat: 9.9658, lng: 76.2421 },
    ],
    bestTime: "September to March",
    duration: "6-8 Days",
    highlights: ["Houseboat Stay", "Ayurveda Spa", "Tea Plantation Tour", "Kathakali Dance", "Wildlife Safari"]
  },
  5: {
    name: "Agra", type: "Heritage", rating: 4.7, price: "₹5,000",
    img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    desc: "Home to the immortal Taj Mahal, Agra is a city where love is etched in marble — a UNESCO World Heritage Site and one of the Seven Wonders of the World.",
    lat: 27.1767, lng: 78.0081,
    spots: [
      { name: "Taj Mahal", desc: "Iconic ivory-white marble mausoleum, a symbol of eternal love", lat: 27.1751, lng: 78.0421 },
      { name: "Agra Fort", desc: "UNESCO listed Mughal fort with palaces and mosques inside", lat: 27.1795, lng: 78.0211 },
      { name: "Fatehpur Sikri", desc: "Abandoned Mughal capital city with stunning red sandstone buildings", lat: 27.0945, lng: 77.6679 },
      { name: "Mehtab Bagh", desc: "Moonlit garden offering the best sunset view of the Taj Mahal", lat: 27.1800, lng: 78.0443 },
      { name: "Kinari Bazaar", desc: "Bustling market for marble handicrafts, leather goods and sweets", lat: 27.1817, lng: 78.0195 },
    ],
    bestTime: "October to March",
    duration: "2-3 Days",
    highlights: ["Taj Mahal Sunrise", "Mughal Architecture", "Marble Handicrafts", "Petha Sweets", "Sunset Views"]
  },
  6: {
    name: "Andaman", type: "Beach", rating: 4.9, price: "₹18,000",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    desc: "Crystal clear turquoise waters, pristine white sand beaches, and vibrant coral reefs make the Andaman Islands India's most exotic tropical destination.",
    lat: 11.7401, lng: 92.6586,
    spots: [
      { name: "Radhanagar Beach", desc: "Rated Asia's best beach with powder-white sand and clear waters", lat: 11.9869, lng: 92.9546 },
      { name: "Cellular Jail", desc: "Historic colonial prison, now a national memorial and light show venue", lat: 11.6695, lng: 92.7463 },
      { name: "Havelock Island", desc: "Most popular island for snorkeling, diving and beach resorts", lat: 11.9812, lng: 93.0012 },
      { name: "Neil Island", desc: "Quiet, laid-back island known for natural coral bridges", lat: 11.8322, lng: 93.0507 },
      { name: "North Bay Island", desc: "Ideal for glass-bottom boat rides and sea walking", lat: 11.7033, lng: 92.7661 },
    ],
    bestTime: "October to May",
    duration: "6-8 Days",
    highlights: ["Scuba Diving", "Snorkeling", "Sea Walking", "Island Hopping", "Bioluminescent Beaches"]
  },
  7: {
    name: "Rishikesh", type: "Adventure", rating: 4.7, price: "₹7,000",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    desc: "The Yoga Capital of the World sits at the foothills of the Himalayas, offering thrilling river rafting, ancient temples, and a deeply spiritual atmosphere.",
    lat: 30.0869, lng: 78.2676,
    spots: [
      { name: "Laxman Jhula", desc: "Iconic iron suspension bridge over the holy Ganges river", lat: 30.1234, lng: 78.3210 },
      { name: "Ram Jhula", desc: "Sacred bridge connecting ashrams on both banks of the Ganga", lat: 30.1065, lng: 78.3098 },
      { name: "Triveni Ghat", desc: "Sacred bathing ghat with spectacular Ganga Aarti every evening", lat: 30.1048, lng: 78.2975 },
      { name: "Neer Garh Waterfall", desc: "Beautiful waterfall trek through the forest, 4km from town", lat: 30.1347, lng: 78.3452 },
      { name: "Beatles Ashram", desc: "Famous abandoned ashram where The Beatles meditated in 1968", lat: 30.1082, lng: 78.3194 },
    ],
    bestTime: "September to June",
    duration: "3-5 Days",
    highlights: ["River Rafting", "Bungee Jumping", "Yoga Retreats", "Ganga Aarti", "Camping"]
  },
  8: {
    name: "Varanasi", type: "Heritage", rating: 4.6, price: "₹4,500",
    img: "https://images.unsplash.com/photo-1561361058-c24e01dc5c8a?w=800",
    desc: "One of the world's oldest living cities, Varanasi is the spiritual heart of India — a city where ancient traditions, sacred ghats, and the holy Ganges converge.",
    lat: 25.3176, lng: 82.9739,
    spots: [
      { name: "Dashashwamedh Ghat", desc: "Main ghat famous for the spectacular evening Ganga Aarti ceremony", lat: 25.3065, lng: 83.0109 },
      { name: "Kashi Vishwanath Temple", desc: "One of the most sacred Hindu temples dedicated to Lord Shiva", lat: 25.3109, lng: 83.0107 },
      { name: "Manikarnika Ghat", desc: "The sacred cremation ghat, burning continuously for thousands of years", lat: 25.3080, lng: 83.0122 },
      { name: "Sarnath", desc: "Where Buddha gave his first sermon, 13km from Varanasi", lat: 25.3811, lng: 83.0228 },
      { name: "Ramnagar Fort", desc: "18th century fort and museum on the opposite bank of Ganga", lat: 25.2803, lng: 83.0369 },
    ],
    bestTime: "October to March",
    duration: "2-3 Days",
    highlights: ["Ganga Aarti", "Boat Ride at Sunrise", "Ancient Temples", "Banarasi Silk", "Street Food"]
  },
  9: {
    name: "Coorg", type: "Nature", rating: 4.8, price: "₹9,000",
    img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800",
    desc: "The Scotland of India, Coorg is a misty paradise of coffee plantations, rolling hills, roaring waterfalls, and rich Kodava culture in Karnataka.",
    lat: 12.3375, lng: 75.8069,
    spots: [
      { name: "Abbey Falls", desc: "Stunning waterfall surrounded by coffee plantations and spice estates", lat: 12.4147, lng: 75.7352 },
      { name: "Raja's Seat", desc: "Scenic garden with breathtaking sunset views over misty valleys", lat: 12.4211, lng: 75.7379 },
      { name: "Namdroling Monastery", desc: "Golden Temple, one of the largest Tibetan Buddhist monasteries", lat: 12.3522, lng: 75.9317 },
      { name: "Dubare Elephant Camp", desc: "Interactive elephant camp on the banks of river Cauvery", lat: 12.3498, lng: 75.9421 },
      { name: "Brahmagiri Peak", desc: "Trekking destination with panoramic views of the Western Ghats", lat: 11.9368, lng: 75.8924 },
    ],
    bestTime: "October to March",
    duration: "3-4 Days",
    highlights: ["Coffee Plantation Tour", "Elephant Camp", "Waterfall Treks", "Coorg Cuisine", "Monastery Visit"]
  },
}

const mapContainerStyle = { width: '100%', height: '400px' }

const DestinationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dest = destinationsData[parseInt(id)]
  const [selectedSpot, setSelectedSpot] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  if (!dest) return (
    <div className="min-h-screen flex items-center justify-center text-2xl text-gray-500">
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
            <span className="text-white text-lg">Starting from <strong>{dest.price}</strong></span>
            <span className="text-blue-200">🕒 {dest.duration}</span>
            <span className="text-blue-200">📅 Best: {dest.bestTime}</span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 flex gap-2 overflow-x-auto">
          {['overview', 'spots', 'map'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-semibold capitalize text-sm border-b-2 transition whitespace-nowrap ${
                activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-500'
              }`}>
              {tab === 'overview' ? '📋 Overview' : tab === 'spots' ? '📍 Tourist Spots' : '🗺️ Map'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">About {dest.name}</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{dest.desc}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Highlights</h2>
                <div className="flex flex-wrap gap-3">
                  {dest.highlights.map(h => (
                    <span key={h} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium text-sm border border-blue-100">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Tourist Spots</h2>
                <div className="flex flex-col gap-3">
                  {dest.spots.map((spot, i) => (
                    <div key={spot.name} className="flex gap-4 items-start p-3 rounded-xl hover:bg-blue-50 transition cursor-pointer"
                      onClick={() => setActiveTab('map') || setSelectedSpot(spot)}>
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{spot.name}</div>
                        <div className="text-gray-500 text-sm">{spot.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="flex flex-col gap-4">
              <div className="bg-blue-700 text-white rounded-2xl p-6">
                <div className="text-3xl font-extrabold mb-1">{dest.price}</div>
                <div className="text-blue-200 text-sm mb-4">Per person (starting from)</div>
                <button onClick={() => navigate('/booking', { state: { destination: dest.name } })}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition text-lg">
                  Book Now 🚀
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-bold text-gray-800 text-lg">Trip Info</h3>
                {[
                  ["📅", "Best Time", dest.bestTime],
                  ["🕒", "Duration", dest.duration],
                  ["🏷️", "Category", dest.type],
                  ["⭐", "Rating", `${dest.rating} / 5`],
                ].map(([icon, label, value]) => (
                  <div key={label} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-500 text-sm">{icon} {label}</span>
                    <span className="font-semibold text-gray-800 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TOURIST SPOTS TAB */}
        {activeTab === 'spots' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dest.spots.map((spot, i) => (
              <div key={spot.name}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => { setActiveTab('map'); setSelectedSpot(spot) }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">{spot.name}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{spot.desc}</p>
                <div className="mt-4 text-blue-600 text-sm font-semibold">View on map →</div>
              </div>
            ))}
          </div>
        )}

        {/* MAP TAB */}
        {activeTab === 'map' && (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <LoadScript googleMapsApiKey={MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{ lat: dest.lat, lng: dest.lng }}
                  zoom={11}
                >
                  {dest.spots.map(spot => (
                    <Marker
                      key={spot.name}
                      position={{ lat: spot.lat, lng: spot.lng }}
                      title={spot.name}
                      onClick={() => setSelectedSpot(spot)}
                    />
                  ))}
                  {selectedSpot && (
                    <InfoWindow
                      position={{ lat: selectedSpot.lat, lng: selectedSpot.lng }}
                      onCloseClick={() => setSelectedSpot(null)}
                    >
                      <div className="p-1 max-w-xs">
                        <h3 className="font-bold text-gray-800 text-base mb-1">{selectedSpot.name}</h3>
                        <p className="text-gray-600 text-sm">{selectedSpot.desc}</p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            </div>

            {/* Spot list below map */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dest.spots.map((spot, i) => (
                <div key={spot.name}
                  onClick={() => setSelectedSpot(spot)}
                  className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${
                    selectedSpot?.name === spot.name ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white hover:border-blue-300'
                  }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <span className="font-semibold text-gray-800 text-sm">{spot.name}</span>
                  </div>
                  <p className="text-gray-500 text-xs">{spot.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-300 text-center py-6 mt-10">
        <p className="text-lg font-semibold text-white mb-1">🌍 WanderIndia</p>
        <p className="text-sm">© 2025 WanderIndia. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default DestinationDetail