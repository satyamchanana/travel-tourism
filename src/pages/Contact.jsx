import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all required fields!')
      return
    }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    alert("Please enter a valid email address!")
    return
  }
    setStatus('loading')
    try {
      await addDoc(collection(db, 'contacts'), {
        ...form,
        sentAt: new Date().toISOString()
      })
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-blue-700 text-white py-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-3">Contact Us</h1>
        <p className="text-blue-200 text-lg">Have a question or need help? We'd love to hear from you.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>

          {status === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-xl mb-6 text-sm font-semibold">
              ✅ Message sent! We'll get back to you within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-xl mb-6 text-sm font-semibold">
              ❌ Something went wrong. Please try again.
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1 block">Name *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1 block">Email *</label>
                <input name="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com" type="email"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition" />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange}
                placeholder="What's this about?"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition resize-none" />
            </div>
            <button onClick={handleSubmit} disabled={status === 'loading'}
              className="w-full bg-blue-700 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-4 rounded-2xl text-lg transition">
              {status === 'loading' ? 'Sending... ⏳' : 'Send Message 📨'}
            </button>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <div className="flex flex-col gap-5">
              {[
                ["📍", "Address", "Seth Jai Parkash Polytechnic, Damla, Haryana, India"],
                ["📧", "Email", "satyam@sjpdamla.ac.in"],
                ["📞", "Phone", "+91 83960 19122"],
                ["🕒", "Support Hours", "Mon - Sat, 9:00 AM to 6:00 PM IST"],
              ].map(([icon, label, value]) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-700 rounded-xl p-3 text-xl flex-shrink-0">{icon}</div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{label}</div>
                    <div className="text-gray-500 text-sm mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-700 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold mb-2">Ready to explore India? 🇮🇳</h3>
            <p className="text-blue-200 text-sm mb-4">Browse our destinations and find your next adventure today.</p>
            <a href="/destinations"
              className="inline-block bg-white text-blue-700 font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition text-sm">
              Browse Destinations →
            </a>
          </div>

          {/* EMBED MAP */}
          <div className="rounded-3xl overflow-hidden shadow-sm h-52">
            <iframe
              title="WanderIndia Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.1!2d77.3!3d29.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDM2JzAwLjAiTiA3N8KwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Contact