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
      alert('Please enter a valid email address!')
      return
    }
    setStatus('loading')
    try {
      await addDoc(collection(db, 'contacts'), { ...form, sentAt: new Date().toISOString() })
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch { setStatus('error') }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950 transition-colors duration-300">

      {/* HEADER */}
      <div className="bg-[#1B3B6F] dark:bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">✦ Get in Touch</p>
          <h1 className="text-5xl font-extrabold tracking-tight mb-3">Contact Us</h1>
          <p className="text-blue-200 dark:text-gray-400 text-sm">Have a question or need help? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* FORM */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>

          {status === 'success' && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-400 px-4 py-3 rounded-xl mb-6 text-sm font-semibold">
              ✅ Message sent! We'll get back to you within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-6 text-sm font-semibold">
              ❌ Something went wrong. Please try again.
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your name"
                  className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Email *</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" type="email"
                  className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?"
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Tell us how we can help..." rows={5}
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition resize-none text-sm" />
            </div>
            <button onClick={handleSubmit} disabled={status === 'loading'}
              className="w-full bg-[#1B3B6F] dark:bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-2xl text-sm transition hover:scale-[1.01]">
              {status === 'loading' ? 'Sending... ⏳' : 'Send Message 📨'}
            </button>
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-5">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
            <div className="flex flex-col gap-5">
              {[
                ["📍", "Address", "Seth Jai Parkash Polytechnic, Damla, Haryana, India"],
                ["📧", "Email", "satyam@sjpdamla.ac.in"],
                ["📞", "Phone", "+91 83960 19122"],
                ["🕒", "Support Hours", "Mon - Sat, 9:00 AM to 6:00 PM IST"],
              ].map(([icon, label, value]) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-xl p-3 text-xl flex-shrink-0">{icon}</div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white text-sm">{label}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1B3B6F] dark:bg-blue-900/50 dark:border dark:border-blue-800 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold mb-2">Ready to explore India? 🇮🇳</h3>
            <p className="text-blue-200 text-sm mb-4">Browse our destinations and find your next adventure today.</p>
            <a href="/destinations"
              className="inline-block bg-white dark:bg-blue-600 text-[#1B3B6F] dark:text-white font-bold px-6 py-3 rounded-full hover:bg-blue-50 dark:hover:bg-blue-500 transition text-sm">
              Browse Destinations →
            </a>
          </div>

          <div className="rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm h-52">
            <iframe
              title="WanderIndia Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.1!2d77.3!3d29.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDM2JzAwLjAiTiA3N8KwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact