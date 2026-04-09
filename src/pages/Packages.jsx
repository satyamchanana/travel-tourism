import { useNavigate } from 'react-router-dom'

const packages = [
  {
    name: "Budget Explorer",
    price: "₹4,000 - ₹7,000",
    icon: "🎒",
    color: "from-green-400 to-emerald-600",
    popular: false,
    features: [
      "3-4 Days Trip",
      "Budget Hotel Stay",
      "Local Transport",
      "1 Guided Tour",
      "Travel Insurance",
      "24/7 Support",
    ],
    notIncluded: ["Flight Tickets", "Premium Meals", "Adventure Activities"]
  },
  {
    name: "Standard Voyager",
    price: "₹7,000 - ₹12,000",
    icon: "✈️",
    color: "from-blue-500 to-blue-700",
    popular: true,
    features: [
      "5-6 Days Trip",
      "3-Star Hotel Stay",
      "AC Transport",
      "2 Guided Tours",
      "Travel Insurance",
      "Welcome Kit",
      "24/7 Support",
    ],
    notIncluded: ["Flight Tickets", "Adventure Activities"]
  },
  {
    name: "Premium Traveller",
    price: "₹12,000 - ₹20,000",
    icon: "🌟",
    color: "from-purple-500 to-purple-700",
    popular: false,
    features: [
      "6-8 Days Trip",
      "4-Star Hotel Stay",
      "Private AC Transport",
      "3 Guided Tours",
      "Travel Insurance",
      "Welcome Kit",
      "Adventure Activity",
      "24/7 Dedicated Support",
    ],
    notIncluded: ["Flight Tickets"]
  },
  {
    name: "Luxury Escape",
    price: "₹20,000+",
    icon: "👑",
    color: "from-yellow-500 to-orange-500",
    popular: false,
    features: [
      "8-10 Days Trip",
      "5-Star Resort Stay",
      "Private Chauffeur",
      "Unlimited Guided Tours",
      "Premium Travel Insurance",
      "Welcome Hamper",
      "All Adventure Activities",
      "Personal Trip Concierge",
      "Airport Transfers",
    ],
    notIncluded: []
  },
]

const destinations = [
  { name: "Goa", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400", trips: "1420 trips" },
  { name: "Manali", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400", trips: "958 trips" },
  { name: "Kerala", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400", trips: "117 trips" },
  { name: "Jaipur", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400", trips: "899 trips" },
]

const Packages = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-blue-700 text-white py-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-3">Tour Packages</h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Choose a package that fits your budget and travel style. Every package includes handpicked experiences across India.
        </p>
      </div>

      {/* PACKAGES GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map(pkg => (
            <div key={pkg.name}
              className={`relative bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {pkg.popular && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  Most Popular
                </div>
              )}
              <div className={`bg-gradient-to-br ${pkg.color} p-8 text-white text-center`}>
                <div className="text-5xl mb-3">{pkg.icon}</div>
                <h3 className="text-xl font-extrabold mb-1">{pkg.name}</h3>
                <div className="text-lg font-bold opacity-90">{pkg.price}</div>
                <div className="text-sm opacity-70">per person</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-col gap-2 flex-1">
                  {pkg.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500 font-bold">✓</span> {f}
                    </div>
                  ))}
                  {pkg.notIncluded.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-400 line-through">
                      <span className="text-red-400">✗</span> {f}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/booking', { state: { package: pkg.name } })}
                  className={`mt-6 w-full py-3 rounded-2xl font-bold text-sm transition ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-800'
                  }`}>
                  Book This Package 🚀
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPULAR DESTINATIONS */}
      <div className="bg-blue-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Popular with Our Travelers</h2>
          <p className="text-center text-gray-500 mb-10">Most booked destinations this season</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {destinations.map(d => (
              <div key={d.name}
                onClick={() => navigate('/destinations')}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-48">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-bold text-lg">{d.name}</div>
                  <div className="text-xs text-gray-300">{d.trips}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
        {[
          ["Are flight tickets included?", "Flight tickets are not included in any package. We focus on ground experience — stay, transport, tours, and activities."],
          ["Can I customize my package?", "Absolutely! After booking, our team will contact you to customize the itinerary based on your preferences."],
          ["What is your cancellation policy?", "Free cancellation up to 7 days before departure. 50% refund between 3-7 days. No refund within 3 days."],
          ["Is travel insurance mandatory?", "All packages include basic travel insurance. We recommend upgrading for international or adventure-heavy trips."],
        ].map(([q, a]) => (
          <details key={q} className="bg-white rounded-2xl shadow-sm mb-3 px-6 py-4 cursor-pointer group">
            <summary className="font-semibold text-gray-800 text-base list-none flex justify-between items-center">
              {q}
              <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform duration-200">+</span>
            </summary>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">{a}</p>
          </details>
        ))}
      </div>


    </div>
  )
}

export default Packages