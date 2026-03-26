import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      onLogin()
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-3xl p-10 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">⚙️</div>
          <h1 className="text-3xl font-extrabold text-white">Admin Portal</h1>
          <p className="text-gray-400 mt-1">WanderIndia Dashboard</p>
        </div>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm text-center">
            {error}
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="admin@wanderindia.com"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white font-bold py-3 rounded-xl transition mt-2 text-lg"
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </div>
      </div>
    </div>
  )
}

const Admin = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterDest, setFilterDest] = useState('All')
  const [loggedIn, setLoggedIn] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [activeTab, setActiveTab] = useState('bookings')

  useEffect(() => {
    if (user) { setLoggedIn(true); fetchBookings() }
  }, [user])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(collection(db, 'bookings'))
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      data.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt))
      setBookings(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'bookings', id))
      setBookings(prev => prev.filter(b => b.id !== id))
      setDeleteConfirm(null)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = async () => {
    await logout()
    setLoggedIn(false)
    navigate('/')
  }

  if (!user && !loggedIn) return <AdminLogin onLogin={() => setLoggedIn(true)} />

  const destinations = ['All', ...new Set(bookings.map(b => b.destination))]
  const filtered = bookings.filter(b => {
    const matchSearch = b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.destination?.toLowerCase().includes(search.toLowerCase())
    const matchDest = filterDest === 'All' || b.destination === filterDest
    return matchSearch && matchDest
  })

  // Stats
  const totalBookings = bookings.length
  const destinations_set = new Set(bookings.map(b => b.destination)).size
  const totalTravelers = bookings.reduce((sum, b) => sum + (parseInt(b.travelers) || 1), 0)
  const thisMonth = bookings.filter(b => {
    if (!b.bookedAt) return false
    const d = new Date(b.bookedAt)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* TOP NAV */}
      <div className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-blue-400">🌍 WanderIndia</span>
          <span className="bg-blue-600 text-xs px-2 py-0.5 rounded-full font-semibold">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm hidden md:block">{user?.email}</span>
          <button
            onClick={fetchBookings}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition"
          >
            🔄 Refresh
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: totalBookings, icon: "📋", color: "blue" },
            { label: "Destinations Booked", value: destinations_set, icon: "🗺️", color: "green" },
            { label: "Total Travelers", value: totalTravelers, icon: "👥", color: "purple" },
            { label: "This Month", value: thisMonth, icon: "📅", color: "yellow" },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-white">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6 border-b border-gray-700">
          {['bookings', 'analytics'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize text-sm border-b-2 transition ${
                activeTab === tab ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}>
              {tab === 'bookings' ? '📋 All Bookings' : '📊 Analytics'}
            </button>
          ))}
        </div>

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <>
            {/* FILTERS */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Search by name, email or destination..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition flex-1"
              />
              <select
                value={filterDest}
                onChange={e => setFilterDest(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition"
              >
                {destinations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* TABLE */}
            {loading ? (
              <div className="text-center text-gray-400 py-20 text-xl">Loading bookings... ⏳</div>
            ) : filtered.length === 0 ? (
              <div className="text-center text-gray-500 py-20 text-xl">No bookings found 😕</div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map(b => (
                  <div key={b.id} className="bg-gray-800 rounded-2xl p-5 border border-gray-700 hover:border-blue-500 transition">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
                        <div className="bg-blue-600 rounded-xl p-3 w-fit">
                          <span className="text-2xl">✈️</span>
                        </div>
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <div className="text-gray-400 text-xs mb-0.5">Traveler</div>
                            <div className="font-semibold text-white">{b.name}</div>
                            <div className="text-gray-400 text-xs">{b.email}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-xs mb-0.5">Destination</div>
                            <div className="font-semibold text-blue-400">{b.destination}</div>
                            <div className="text-gray-400 text-xs">{b.package?.split('(')[0]}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-xs mb-0.5">Travel Dates</div>
                            <div className="font-semibold text-white text-sm">{b.checkIn} → {b.checkOut}</div>
                            <div className="text-gray-400 text-xs">👥 {b.travelers} traveler(s)</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-xs mb-0.5">Booked On</div>
                            <div className="font-semibold text-white text-sm">
                              {b.bookedAt ? new Date(b.bookedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                            </div>
                            <div className="text-gray-400 text-xs">{b.phone}</div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setDeleteConfirm(b.id)}
                        className="bg-red-600/20 hover:bg-red-600 border border-red-600 text-red-400 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                    {b.message && (
                      <div className="mt-3 bg-gray-700 rounded-lg px-4 py-2 text-gray-300 text-sm">
                        💬 {b.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Top Destinations */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-white">🏆 Top Destinations</h3>
              {(() => {
                const counts = {}
                bookings.forEach(b => { counts[b.destination] = (counts[b.destination] || 0) + 1 })
                const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)
                const max = sorted[0]?.[1] || 1
                return sorted.length === 0 ? (
                  <p className="text-gray-500">No data yet</p>
                ) : sorted.map(([dest, count]) => (
                  <div key={dest} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{dest}</span>
                      <span className="text-blue-400 font-semibold">{count} booking{count > 1 ? 's' : ''}</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(count / max) * 100}%` }} />
                    </div>
                  </div>
                ))
              })()}
            </div>

            {/* Top Packages */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-white">📦 Popular Packages</h3>
              {(() => {
                const counts = {}
                bookings.forEach(b => {
                  const pkg = b.package?.split('(')[0].trim() || 'Unknown'
                  counts[pkg] = (counts[pkg] || 0) + 1
                })
                const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
                const max = sorted[0]?.[1] || 1
                return sorted.length === 0 ? (
                  <p className="text-gray-500">No data yet</p>
                ) : sorted.map(([pkg, count]) => (
                  <div key={pkg} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{pkg}</span>
                      <span className="text-purple-400 font-semibold">{count} booking{count > 1 ? 's' : ''}</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(count / max) * 100}%` }} />
                    </div>
                  </div>
                ))
              })()}
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 lg:col-span-2">
              <h3 className="text-lg font-bold mb-4 text-white">🕒 Recent Bookings</h3>
              <div className="flex flex-col gap-3">
                {bookings.slice(0, 5).map(b => (
                  <div key={b.id} className="flex items-center justify-between bg-gray-700 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {b.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <span className="font-semibold text-white text-sm">{b.name}</span>
                        <span className="text-gray-400 text-xs ml-2">→ {b.destination}</span>
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs">
                      {b.bookedAt ? new Date(b.bookedAt).toLocaleDateString('en-IN') : ''}
                    </span>
                  </div>
                ))}
                {bookings.length === 0 && <p className="text-gray-500 text-sm">No bookings yet</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full border border-gray-700 text-center">
            <div className="text-5xl mb-4">🗑️</div>
            <h3 className="text-xl font-bold text-white mb-2">Delete Booking?</h3>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-semibold transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin