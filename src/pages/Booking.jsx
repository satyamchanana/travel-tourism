import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const destinations = ["Goa", "Manali", "Jaipur", "Kerala", "Agra", "Andaman", "Rishikesh", "Varanasi", "Coorg"]
const packages = ["Budget (₹4,000 - ₹7,000)", "Standard (₹7,000 - ₹12,000)", "Premium (₹12,000 - ₹20,000)", "Luxury (₹20,000+)"]

const Booking = () => {
  const location = useLocation()
  const preSelected = location.state?.destination || ""

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: preSelected,
    package: "",
    travelers: "1",
    checkIn: "",
    checkOut: "",
    message: ""
  })

  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

const handleSubmit = async () => {
  if (!form.name || !form.email || !form.phone || !form.destination || !form.package || !form.checkIn || !form.checkOut) {
    alert("Please fill in all required fields!")
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    alert("Please enter a valid email address!")
    return
  }
  if (!/^[0-9]{10}$/.test(form.phone.replace(/\s/g, ''))) {
    alert("Please enter a valid 10-digit phone number!")
    return
  }
  if (new Date(form.checkOut) <= new Date(form.checkIn)) {
    alert("Check-out date must be after check-in date!")
    return
  }
  if (new Date(form.checkIn) < new Date()) {
    alert("Check-in date cannot be in the past!")
    return
  }
  setStatus('loading')
  try {
    await addDoc(collection(db, "bookings"), {
      ...form,
      bookedAt: new Date().toISOString()
    })
    setStatus('success')
    setForm({ name: "", email: "", phone: "", destination: preSelected, package: "", travelers: "1", checkIn: "", checkOut: "", message: "" })
  } catch (err) {
    console.error(err)
    setStatus('error')
  }
}

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-blue-700 text-white py-14 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-3">Book Your Trip</h1>
        <p className="text-blue-200 text-lg">Fill in the details and we'll take care of the rest</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* SUCCESS MESSAGE */}
        {status === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-2xl mb-8 text-center text-lg font-semibold">
            🎉 Booking Confirmed! We'll contact you shortly on your email.
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-800 px-6 py-4 rounded-2xl mb-8 text-center text-lg font-semibold">
            ❌ Something went wrong. Please try again.
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col gap-6">

          {/* PERSONAL INFO */}
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">👤 Personal Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Full Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Email *</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@email.com"
                type="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Phone *</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">No. of Travelers *</label>
              <input
                name="travelers"
                value={form.travelers}
                onChange={handleChange}
                type="number"
                min="1"
                max="20"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* TRIP INFO */}
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mt-2">✈️ Trip Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Destination *</label>
              <select
                name="destination"
                value={form.destination}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition bg-white"
              >
                <option value="">Select destination</option>
                {destinations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Package *</label>
              <select
                name="package"
                value={form.package}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition bg-white"
              >
                <option value="">Select package</option>
                {packages.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Check-in Date *</label>
              <input
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
                type="date"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Check-out Date *</label>
              <input
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
                type="date"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">Special Requests (optional)</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Any special requirements, preferences or questions..."
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition resize-none"
            />
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-4 rounded-2xl text-lg transition shadow-md"
          >
            {status === 'loading' ? "Booking... ⏳" : "Confirm Booking 🚀"}
          </button>

        </div>
      </div>


    </div>
  )
}

export default Booking