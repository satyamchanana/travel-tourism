import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const TIERS = [
  { key: 'budget', label: 'Budget Explorer', emoji: '🎒', multiplier: 1.0, color: 'from-emerald-400 to-green-600',
    features: ['3-4 Days Trip', 'Budget Hotel Stay', 'Local Transport', '1 Guided Tour', 'Travel Insurance', '24/7 Support'],
    notIncluded: ['Flight Tickets', 'Premium Meals', 'Adventure Activities'] },
  { key: 'standard', label: 'Standard Voyager', emoji: '✈️', multiplier: 1.5, color: 'from-blue-500 to-blue-700', popular: true,
    features: ['5-6 Days Trip', '3-Star Hotel Stay', 'AC Transport', '2 Guided Tours', 'Travel Insurance', 'Welcome Kit', '24/7 Support'],
    notIncluded: ['Flight Tickets', 'Adventure Activities'] },
  { key: 'premium', label: 'Premium Traveller', emoji: '🌟', multiplier: 2.0, color: 'from-purple-500 to-purple-700',
    features: ['6-8 Days Trip', '4-Star Hotel Stay', 'Private Transport', '3 Guided Tours', 'Travel Insurance', 'Welcome Kit', '1 Adventure Activity', 'Dedicated Support'],
    notIncluded: ['Flight Tickets'] },
  { key: 'luxury', label: 'Luxury Escape', emoji: '👑', multiplier: 3.0, color: 'from-yellow-500 to-orange-500',
    features: ['8-10 Days Trip', '5-Star Resort Stay', 'Private Chauffeur', 'Unlimited Tours', 'Premium Insurance', 'Welcome Hamper', 'All Activities', 'Personal Concierge', 'Airport Transfers'],
    notIncluded: [] },
]

const Packages = () => {
  const navigate = useNavigate()
  const [destinations, setDestinations] = useState([])
  const [selectedDest, setSelectedDest] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, 'destinations'))
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setDestinations(data)
      setSelectedDest(data[0])
    }
    fetch()
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950 transition-colors">

      {/* HEADER */}
      <div className="bg-[#1B3B6F] dark:bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">✦ Packages</p>
          <h1 className="text-5xl font-extrabold tracking-tight mb-3">Choose Your Style</h1>
          <p className="text-blue-200 text-sm max-w-lg mx-auto">
            Every package adapts to your destination — prices shown are based on the destination you select below.
          </p>
        </div>
      </div>

      {/* DESTINATION SELECTOR */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-40 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">See prices for:</p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {destinations.map(d => (
              <button key={d.id} onClick={() => setSelectedDest(d)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedDest?.id === d.id
                    ? 'bg-[#1B3B6F] dark:bg-blue-600 text-white shadow-md scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}>
                {d.name}
                {selectedDest?.id === d.id && <span className="text-blue-300 text-xs">₹{d.price?.toLocaleString()}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PACKAGES GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {selectedDest && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-10">
            Showing prices for <strong className="text-gray-900 dark:text-white">{selectedDest.name}</strong> — base price ₹{selectedDest.price?.toLocaleString()} per person
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map(tier => {
            const price = selectedDest ? Math.round(selectedDest.price * tier.multiplier) : null
            return (
              <div key={tier.key}
                className={`relative bg-white dark:bg-gray-900 rounded-3xl border-2 overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl duration-300 ${
                  tier.popular
                    ? 'border-blue-500 dark:border-blue-500 shadow-lg'
                    : 'border-gray-100 dark:border-gray-800'
                }`}>
                {tier.popular && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    Most Popular
                  </div>
                )}
                <div className={`bg-gradient-to-br ${tier.color} p-7 text-white`}>
                  <div className="text-4xl mb-3">{tier.emoji}</div>
                  <h3 className="text-xl font-extrabold mb-1">{tier.label}</h3>
                  {price ? (
                    <div>
                      <p className="text-2xl font-extrabold">₹{price.toLocaleString()}</p>
                      <p className="text-white/70 text-xs">per person · {tier.duration}</p>
                    </div>
                  ) : (
                    <p className="text-white/70 text-sm">Select a destination above</p>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-col gap-1.5 flex-1">
                    {tier.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                        <span className="text-green-500 font-bold flex-shrink-0">✓</span> {f}
                      </div>
                    ))}
                    {tier.notIncluded.map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs text-gray-400 line-through">
                        <span className="text-red-400 flex-shrink-0">✗</span> {f}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/booking', {
                      state: {
                        destination: selectedDest?.name,
                        tier: tier.key
                      }
                    })}
                    className={`mt-5 w-full py-3 rounded-2xl font-bold text-sm transition ${
                      tier.popular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-[#1B3B6F] dark:hover:bg-blue-600 hover:text-white text-gray-800 dark:text-gray-200'
                    }`}>
                    Book {tier.label} 🚀
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10 tracking-tight">FAQs</h2>
        {[
          ["Are flight tickets included?", "Flight tickets are not included in any package. We focus on ground experience — stay, transport, tours and activities at your destination."],
          ["Can I customize my package?", "Absolutely! After booking, our team will contact you to tailor the itinerary based on your preferences."],
          ["What is your cancellation policy?", "Free cancellation up to 7 days before departure. 50% refund between 3-7 days. No refund within 3 days of departure."],
          ["Are prices per person or per group?", "All prices shown are per person. The total is calculated based on the number of travelers during booking."],
        ].map(([q, a]) => (
          <details key={q} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 mb-3 px-6 py-4 cursor-pointer group">
            <summary className="font-semibold text-gray-800 dark:text-white text-sm list-none flex justify-between items-center">
              {q}
              <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform duration-200">+</span>
            </summary>
            <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm leading-relaxed">{a}</p>
          </details>
        ))}
      </div>

    </div>
  )
}

export default Packages