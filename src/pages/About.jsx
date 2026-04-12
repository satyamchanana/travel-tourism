import { useNavigate } from 'react-router-dom'

const team = [
  { name: "Satyam Chanana", role: "Full Stack Developer", emoji: "👨‍💻", desc: "Built the entire WanderIndia platform from scratch using React and Firebase." },
  { name: "Satyam Chanana", role: "UI/UX Designer", emoji: "🎨", desc: "Designed the user experience and visual identity of WanderIndia." },
  { name: "Neerav Rana", role: "Backend Developer", emoji: "🔧", desc: "Architected the Firebase database structure and booking system." },
]

const About = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* HERO */}
      <div className="relative bg-[#1B3B6F] dark:bg-gray-900 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600')] bg-cover bg-center" />
        <div className="relative z-10">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">✦ Our Story</p>
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight">About WanderIndia</h1>
          <p className="text-blue-200 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            We're on a mission to make travel planning across India simple, beautiful and accessible for everyone.
          </p>
        </div>
      </div>

      {/* MISSION */}
      <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-3">✦ Mission</p>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-5 tracking-tight">Why We Built This</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base mb-4">
            India is one of the most diverse and breathtaking countries in the world — from the beaches of Goa to the mountains of Manali, the heritage of Jaipur to the backwaters of Kerala.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base mb-6">
            WanderIndia was built to be the single platform where every Indian traveler can discover, plan and book their perfect trip — without the clutter, confusion or complexity of existing platforms.
          </p>
          <button onClick={() => navigate('/destinations')}
            className="bg-[#1B3B6F] dark:bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full transition text-sm">
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
            <div key={label} className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 text-center hover:shadow-md transition">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-3xl font-extrabold text-[#1B3B6F] dark:text-blue-400">{num}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STORY */}
      <div className="bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 py-20 px-6 transition-colors">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-3">✦ The Story</p>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">How It Started</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base mb-4">
            WanderIndia started as a final year diploma project at Seth Jai Parkash Polytechnic, Damla. We saw how frustrating it was for people around us to plan trips — switching between apps, comparing prices on different websites, and still ending up confused.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
            So we built WanderIndia — a clean, fast and visually beautiful platform that brings destination discovery, package selection and booking all under one roof.
          </p>
        </div>
      </div>

      {/* TEAM */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-3">✦ The Team</p>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Meet the Builders</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map(member => (
            <div key={member.name}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 text-center hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-6xl mb-4">{member.emoji}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
              <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-3">{member.role}</div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VALUES */}
      <div className="bg-[#1B3B6F] dark:bg-gray-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-300 font-bold text-xs uppercase tracking-widest mb-3">✦ Values</p>
            <h2 className="text-4xl font-extrabold tracking-tight">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              ["🎯", "Simplicity", "Travel planning should be easy. We cut the clutter so you can focus on the adventure."],
              ["🌿", "Authenticity", "We highlight India's real hidden gems, not just the tourist traps."],
              ["💙", "Traveler First", "Every feature we build is designed around making your travel experience better."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-white/10 dark:bg-white/5 rounded-2xl p-8">
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-blue-200 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default About