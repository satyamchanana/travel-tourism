import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

const TIERS = [
  { key: 'budget', label: 'Budget', emoji: '🎒', multiplier: 1.0, duration: '3-4 Days', features: ['Budget Hotel', 'Local Transport', '1 Guided Tour', 'Travel Insurance'] },
  { key: 'standard', label: 'Standard', emoji: '✈️', multiplier: 1.5, duration: '5-6 Days', features: ['3-Star Hotel', 'AC Transport', '2 Guided Tours', 'Travel Insurance', 'Welcome Kit'], popular: true },
  { key: 'premium', label: 'Premium', emoji: '🌟', multiplier: 2.0, duration: '6-8 Days', features: ['4-Star Hotel', 'Private Transport', '3 Guided Tours', 'Travel Insurance', 'Welcome Kit', '1 Adventure Activity'] },
  { key: 'luxury', label: 'Luxury', emoji: '👑', multiplier: 3.0, duration: '8-10 Days', features: ['5-Star Resort', 'Private Chauffeur', 'Unlimited Tours', 'Premium Insurance', 'Welcome Hamper', 'All Activities', 'Personal Concierge'] },
]

const Booking = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const preSelected = location.state?.destination || ""

  const [destinations, setDestinations] = useState([])
  const [selectedDest, setSelectedDest] = useState(null)
  const [selectedTier, setSelectedTier] = useState(null)
  const [travelers, setTravelers] = useState(1)
  const [status, setStatus] = useState(null)
  const [paymentDone, setPaymentDone] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', checkIn: '', checkOut: '', message: '' })



const preTier = location.state?.tier || null

useEffect(() => {
  const fetch = async () => {
    const snap = await getDocs(collection(db, 'destinations'))
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    setDestinations(data)
    if (preSelected) {
      const found = data.find(d => d.name === preSelected)
      if (found) setSelectedDest(found)
    }
    if (preTier) {
      const found = TIERS.find(t => t.key === preTier)
      if (found) setSelectedTier(found)
    }
  }
  fetch()
}, [])

  const basePrice = selectedDest?.price || 0
  const tierPrice = selectedTier ? Math.round(basePrice * selectedTier.multiplier) : 0
  const totalPrice = tierPrice * travelers

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    if (!selectedDest) { alert('Please select a destination!'); return false }
    if (!selectedTier) { alert('Please select a package tier!'); return false }
    if (!form.name || !form.email || !form.phone || !form.checkIn || !form.checkOut) {
      alert('Please fill in all required fields!'); return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert('Please enter a valid email!'); return false
    }
    if (!/^[0-9]{10}$/.test(form.phone.replace(/\s/g, ''))) {
      alert('Please enter a valid 10-digit phone number!'); return false
    }
    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
      alert('Check-out must be after check-in!'); return false
    }
    if (new Date(form.checkIn) < new Date(new Date().toDateString())) {
      alert('Check-in cannot be in the past!'); return false
    }
    return true
  }

  const saveBooking = async (paymentId) => {
    await addDoc(collection(db, 'bookings'), {
      ...form,
      destination: selectedDest.name,
      package: selectedTier.label,
      travelers,
      basePrice,
      tierPrice,
      totalPrice,
      paymentId,
      paymentStatus: 'paid',
      bookedAt: new Date().toISOString()
    })
  }

  const handlePayment = () => {
    if (!validate()) return
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: totalPrice * 100,
      currency: 'INR',
      name: 'WanderIndia',
      description: `${selectedTier.label} trip to ${selectedDest.name}`,
      handler: async (response) => {
        setStatus('loading')
        try {
          await saveBooking(response.razorpay_payment_id)
          setPaymentDone(true)
          setStatus('success')
        } catch { setStatus('error') }
      },
      prefill: { name: form.name, email: form.email, contact: form.phone },
      theme: { color: '#1B3B6F' },
      modal: { ondismiss: () => setStatus(null) }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  if (paymentDone) return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">Booking Confirmed!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Your <strong>{selectedTier?.label}</strong> trip to <strong>{selectedDest?.name}</strong> is booked.</p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">We'll reach out on <strong>{form.email}</strong> within 24 hours.</p>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 mb-8 border border-gray-100 dark:border-gray-800 text-left">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['Destination', selectedDest?.name],
              ['Package', selectedTier?.label],
              ['Travelers', travelers],
              ['Check-in', form.checkIn],
              ['Check-out', form.checkOut],
              ['Total Paid', `₹${totalPrice.toLocaleString()}`],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-gray-400 text-xs">{k}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => navigate('/')}
          className="bg-[#1B3B6F] dark:bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition">
          Back to Home
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950 transition-colors duration-300">

      {/* HEADER */}
      <div className="bg-[#1B3B6F] dark:bg-gray-900 text-white py-14 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">✦ Secure Booking</p>
          <h1 className="text-5xl font-extrabold tracking-tight mb-2">Book Your Trip</h1>
          <p className="text-blue-200 dark:text-gray-400 text-sm">Choose your destination, pick a package, and pay securely</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-8">

          {/* STEP 1 — DESTINATION */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-1">
              <span className="bg-[#1B3B6F] dark:bg-blue-600 text-white rounded-full w-7 h-7 inline-flex items-center justify-center text-sm mr-2">1</span>
              Choose Destination
            </h2>
            <p className="text-gray-400 text-xs mb-5 ml-9">Where do you want to go?</p>

            {/* If pre-selected, show a single confirmation card instead of the full grid */}
            {selectedDest && preSelected ? (
              <div className="ml-9 flex items-center gap-4">
                <div className="relative rounded-2xl overflow-hidden w-32 h-20 flex-shrink-0 border-2 border-[#1B3B6F] dark:border-blue-500">
                  <img src={selectedDest.img} alt={selectedDest.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-1.5 left-2 text-white font-bold text-sm">{selectedDest.name}</p>
                </div>
                <div>
                  <p className="text-green-500 font-bold text-sm flex items-center gap-1.5">
                    <span className="bg-green-500 text-white rounded-full w-4 h-4 inline-flex items-center justify-center text-xs">✓</span>
                    Destination selected
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Base price ₹{selectedDest.price?.toLocaleString()} per person</p>
                  <button onClick={() => setSelectedDest(null)}
                    className="text-xs text-blue-500 hover:text-blue-400 mt-1 transition">
                    Change destination →
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {destinations.map(dest => (
                  <div key={dest.id}
                    onClick={() => setSelectedDest(dest)}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                      selectedDest?.id === dest.id
                        ? 'border-[#1B3B6F] dark:border-blue-500 shadow-lg scale-[1.02]'
                        : 'border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                    }`}>
                    <img src={dest.img} alt={dest.name} className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white font-bold text-sm">{dest.name}</p>
                      <p className="text-blue-300 text-xs">from ₹{dest.price?.toLocaleString()}</p>
                    </div>
                    {selectedDest?.id === dest.id && (
                      <div className="absolute top-2 right-2 bg-[#1B3B6F] dark:bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">✓</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        {/* STEP 2 — PACKAGE TIER */}
        {selectedDest && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-1">
              <span className="bg-[#1B3B6F] dark:bg-blue-600 text-white rounded-full w-7 h-7 inline-flex items-center justify-center text-sm mr-2">2</span>
              Choose Package
            </h2>
            <p className="text-gray-400 text-xs mb-5 ml-9">Prices shown for {selectedDest.name} — base ₹{selectedDest.price?.toLocaleString()}/person</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TIERS.map(tier => {
                const price = Math.round(basePrice * tier.multiplier)
                const isSelected = selectedTier?.key === tier.key
                return (
                  <div key={tier.key}
                    onClick={() => setSelectedTier(tier)}
                    className={`relative rounded-2xl p-5 cursor-pointer border-2 transition-all duration-200 flex flex-col gap-3 ${
                      isSelected
                        ? 'border-[#1B3B6F] dark:border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg scale-[1.02]'
                        : 'border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-800'
                    }`}>
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap">
                        Most Popular
                      </span>
                    )}
                    <div className="flex justify-between items-start">
                      <span className="text-2xl">{tier.emoji}</span>
                      {isSelected && <span className="bg-[#1B3B6F] dark:bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>}
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900 dark:text-white text-base">{tier.label}</p>
                      <p className="text-gray-400 text-xs">{tier.duration}</p>
                    </div>
                    <div>
                      <p className="text-[#1B3B6F] dark:text-blue-400 font-extrabold text-xl">₹{price.toLocaleString()}</p>
                      <p className="text-gray-400 text-xs">per person</p>
                    </div>
                    <div className="flex flex-col gap-1 pt-2 border-t border-gray-200 dark:border-gray-700">
                      {tier.features.map(f => (
                        <p key={f} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <span className="text-green-500 font-bold">✓</span> {f}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 3 — TRAVELERS */}
        {selectedTier && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-1">
              <span className="bg-[#1B3B6F] dark:bg-blue-600 text-white rounded-full w-7 h-7 inline-flex items-center justify-center text-sm mr-2">3</span>
              Number of Travelers
            </h2>
            <p className="text-gray-400 text-xs mb-5 ml-9">How many people are traveling?</p>
            <div className="flex items-center gap-4 ml-9">
              <button onClick={() => setTravelers(t => Math.max(1, t - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-xl transition flex items-center justify-center">
                −
              </button>
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white w-10 text-center">{travelers}</span>
              <button onClick={() => setTravelers(t => Math.min(20, t + 1))}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-xl transition flex items-center justify-center">
                +
              </button>
              <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-400">₹{tierPrice.toLocaleString()} × {travelers} person{travelers > 1 ? 's' : ''}</p>
                <p className="text-2xl font-extrabold text-[#1B3B6F] dark:text-blue-400">₹{totalPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 — DETAILS + PAY */}
        {selectedTier && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-1">
              <span className="bg-[#1B3B6F] dark:bg-blue-600 text-white rounded-full w-7 h-7 inline-flex items-center justify-center text-sm mr-2">4</span>
              Your Details
            </h2>
            <p className="text-gray-400 text-xs mb-5 ml-9">Personal info and travel dates</p>

            {status === 'error' && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-4 text-sm ml-9">
                ❌ Something went wrong. Please try again.
              </div>
            )}

            <div className="ml-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'name', label: 'Full Name *', placeholder: 'Your full name', type: 'text' },
                { name: 'email', label: 'Email *', placeholder: 'you@email.com', type: 'email' },
                { name: 'phone', label: 'Phone *', placeholder: '10-digit number', type: 'tel' },
              ].map(f => (
                <div key={f.name}>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">{f.label}</label>
                  <input name={f.name} value={form[f.name]} onChange={handleChange}
                    placeholder={f.placeholder} type={f.type}
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition text-sm" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Check-in *</label>
                <input name="checkIn" value={form.checkIn} onChange={handleChange} type="date"
                  className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Check-out *</label>
                <input name="checkOut" value={form.checkOut} onChange={handleChange} type="date"
                  className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Special Requests</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Any preferences or special requirements..." rows={3}
                  className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition resize-none text-sm" />
              </div>
            </div>

            {/* PRICE SUMMARY */}
            <div className="ml-9 mt-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-3">💰 Price Summary</h3>
              <div className="flex flex-col gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Destination</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{selectedDest?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Package</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{selectedTier?.label} ({selectedTier?.duration})</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per person</span>
                  <span className="font-semibold text-gray-800 dark:text-white">₹{tierPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Travelers</span>
                  <span className="font-semibold text-gray-800 dark:text-white">× {travelers}</span>
                </div>
                <div className="flex justify-between font-extrabold text-lg text-[#1B3B6F] dark:text-blue-400 border-t border-blue-200 dark:border-blue-800 pt-2 mt-1">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="ml-9 mt-4">
              <button onClick={handlePayment} disabled={status === 'loading'}
                className="w-full bg-[#1B3B6F] dark:bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-2xl text-base transition shadow-lg hover:scale-[1.01]">
                {status === 'loading' ? 'Processing... ⏳' : `Pay ₹${totalPrice.toLocaleString()} & Confirm Booking 🔒`}
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">🔒 Secured by Razorpay · UPI · Cards · NetBanking · Wallets</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Booking