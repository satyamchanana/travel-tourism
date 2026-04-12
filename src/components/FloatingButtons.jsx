import { useEffect, useState } from 'react'

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <a href="https://wa.me/918396019122?text=Hi!%20I%20want%20to%20book%20a%20trip%20with%20WanderIndia"
        target="_blank" rel="noreferrer"
        className="bg-green-500 hover:bg-green-400 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition hover:scale-110 text-xl"
        title="Chat on WhatsApp">
        💬
      </a>
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-[#1B3B6F] dark:bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition hover:scale-110 text-xl"
          title="Back to top">
          ↑
        </button>
      )}
    </div>
  )
}

export default FloatingButtons