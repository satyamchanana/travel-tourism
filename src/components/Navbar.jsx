import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: "/", label: "Home" },
    { to: "/destinations", label: "Destinations" },
    { to: "/packages", label: "Packages" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ]

  return (
    <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <Link to="/" className="text-2xl font-extrabold tracking-wide">🌍 WanderIndia</Link>

      {/* Desktop */}
      <div className="hidden md:flex gap-6 text-base items-center">
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`hover:text-yellow-300 transition font-medium ${location.pathname === l.to ? 'text-yellow-300 border-b-2 border-yellow-300 pb-0.5' : ''}`}
          >
            {l.label}
          </Link>
        ))}
        {/* <Link to="/admin" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-1.5 rounded-full text-sm transition">
          Admin ⚙️
        </Link> */}
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-blue-800 flex flex-col items-center gap-4 py-6 md:hidden z-50">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
              className="text-lg hover:text-yellow-300 transition">{l.label}</Link>
          ))}
          <Link to="/admin" onClick={() => setMenuOpen(false)}
            className="bg-yellow-400 text-gray-900 font-bold px-6 py-2 rounded-full">Admin ⚙️</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar