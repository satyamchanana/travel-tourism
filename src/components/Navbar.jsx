import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { dark, toggle } = useTheme()

  const links = [
    { to: "/", label: "Home" },
    { to: "/destinations", label: "Destinations" },
    { to: "/packages", label: "Packages" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ]

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <Link to="/" className="text-xl font-extrabold text-[#1B3B6F] dark:text-white tracking-tight">
        🌍 WanderIndia
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex gap-8 text-sm items-center">
        {links.map(l => (
          <Link key={l.to} to={l.to}
            className={`font-medium transition-colors ${
              location.pathname === l.to
                ? 'text-[#1B3B6F] dark:text-white border-b-2 border-[#1B3B6F] dark:border-white pb-0.5'
                : 'text-gray-500 dark:text-gray-400 hover:text-[#1B3B6F] dark:hover:text-white'
            }`}>
            {l.label}
          </Link>
        ))}

        {/* Dark mode toggle */}
        <button onClick={toggle}
          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg transition hover:scale-110">
          {dark ? '☀️' : '🌙'}
        </button>

        <Link to="/booking"
          className="bg-[#1B3B6F] hover:bg-[#2563EB] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold px-5 py-2 rounded-full text-sm transition">
          Book a Trip
        </Link>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center gap-3">
        <button onClick={toggle}
          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-base transition">
          {dark ? '☀️' : '🌙'}
        </button>
        <button className="text-gray-600 dark:text-gray-300 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-md flex flex-col items-center gap-5 py-6 md:hidden z-50">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
              className={`text-base font-medium ${
                location.pathname === l.to
                  ? 'text-[#1B3B6F] dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
              {l.label}
            </Link>
          ))}
          <Link to="/booking" onClick={() => setMenuOpen(false)}
            className="bg-[#1B3B6F] dark:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm">
            Book a Trip
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar