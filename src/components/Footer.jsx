import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-xl font-extrabold mb-3">🌍 WanderIndia</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Your one-stop platform to discover, plan and book incredible trips across India.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            {[['/', 'Home'], ['/destinations', 'Destinations'], ['/packages', 'Packages'], ['/about', 'About Us']].map(([to, label]) => (
              <Link key={to} to={to} className="hover:text-white transition">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Popular Destinations</h4>
          <div className="flex flex-col gap-2 text-sm">
            {['Goa', 'Manali', 'Kerala', 'Jaipur', 'Andaman'].map(d => (
              <Link key={d} to="/destinations" className="hover:text-white transition">{d}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <span>📧 hello@wanderindia.com</span>
            <span>📞 +91 98765 43210</span>
            <span>🕒 Mon-Sat, 9AM - 6PM IST</span>
            <Link to="/contact" className="text-blue-400 hover:text-blue-300 transition mt-1">Send us a message →</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © 2026 WanderIndia. All rights reserved. Made with ❤️ in India
      </div>
    </footer>
  )
}

export default Footer