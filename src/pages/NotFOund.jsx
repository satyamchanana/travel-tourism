import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center text-center px-6 transition-colors duration-300">
      <div className="text-8xl mb-6">🗺️</div>
      <h1 className="text-8xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">404</h1>
      <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Lost on the map?</p>
      <p className="text-gray-400 dark:text-gray-500 mb-10 max-w-md text-sm leading-relaxed">
        The page you're looking for doesn't exist. Let's get you back to exploring India!
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button onClick={() => navigate('/')}
          className="bg-[#1B3B6F] dark:bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full transition text-sm">
          Go Home 🏠
        </button>
        <button onClick={() => navigate('/destinations')}
          className="border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold px-8 py-3 rounded-full hover:border-[#1B3B6F] dark:hover:border-blue-500 hover:text-[#1B3B6F] dark:hover:text-blue-400 transition text-sm">
          Explore Destinations
        </button>
      </div>
    </div>
  )
}

export default NotFound