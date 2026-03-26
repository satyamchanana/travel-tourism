import { useNavigate } from 'react-router-dom'

const team = [
  { name: "Your Name", role: "Full Stack Developer", emoji: "👨‍💻", desc: "Built the entire WanderIndia platform from scratch using React and Firebase." },
  { name: "Team Member 2", role: "UI/UX Designer", emoji: "🎨", desc: "Designed the user experience and visual identity of WanderIndia." },
  { name: "Team Member 3", role: "Backend Developer", emoji: "🔧", desc: "Architected the Firebase database structure and booking system." },
]

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="relative bg-blue-700 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600')] bg-cover bg-center" />
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold mb-4">About WanderIndia</h1>
          <p className="text-blue-200 text-xl max-w-2xl mx-auto">
            We're on a mission to make travel planning across India simple, beautiful, and accessible for everyone.
          </p>
        </div>
      </div>

      {/* MISSION */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            India is one of the most diverse and breathtaking countries in the world — from the beaches of Goa to the mountains of Manali, the heritage of Jaipur to the backwaters of Kerala.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            WanderIndia was built to be the single platform where every Indian traveler can discover, plan, and book their perfect trip — without the clutter, confusion, or complexity of existing platforms.
          </p>
          <button
            onClick={() => navigate('/destinations')}
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-full transition">
            Explore Destinations →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            ["500+", "Destinations", "🗺️"],
            ["50K+", "Happy Travelers", "😊"],
            ["200+", "Tour Packages", "📦"],
            ["24/7", "Customer Support", "🎯"],
          ].map(([num, label, icon]) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm p-6 text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-3xl font-extrabold text-blue-700">{num}</div>
              <div className="text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* OUR STORY */}
      <div className="bg-blue-50 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            WanderIndia started as a final year diploma project at Seth Jai Parkash Polytechnic, Damla. We saw how frustrating it was for people around us to plan trips — switching between apps, comparing prices on different websites, and still ending up confused.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            So we built WanderIndia — a clean, fast, and visually beautiful platform that brings destination discovery, package selection, and booking all under one roof. What started as a college project, we believe can become a real product that helps millions of Indian travelers.
          </p>
        </div>
      </div>

      {/* TEAM */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Meet the Team</h2>
        <p className="text-center text-gray-500 mb-10">The students behind WanderIndia</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map(member => (
            <div key={member.name} className="bg-white rounded-3xl shadow-sm p-8 text-center hover:shadow-md transition">
              <div className="text-7xl mb-4">{member.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <div className="text-blue-600 font-semibold text-sm mb-3">{member.role}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VALUES */}
      <div className="bg-gray-800 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              ["🎯", "Simplicity", "Travel planning should be easy. We cut the clutter so you can focus on the adventure."],
              ["🌿", "Authenticity", "We highlight India's real hidden gems, not just the tourist traps."],
              ["💙", "Traveler First", "Every feature we build is designed around making your travel experience better."],
            ].map(([icon, title, desc]) => (
              <div key={title}>
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p className="text-lg font-semibold text-white mb-1">🌍 WanderIndia</p>
        <p className="text-sm">© 2026 WanderIndia. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default About