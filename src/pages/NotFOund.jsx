import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-6">🗺️</div>
      <h1 className="text-6xl font-extrabold text-gray-800 mb-3">404</h1>
      <p className="text-2xl font-semibold text-gray-600 mb-2">Lost on the map?</p>
      <p className="text-gray-400 mb-8 max-w-md">The page you're looking for doesn't exist. Let's get you back to exploring India!</p>
      <div className="flex gap-4">
        <button onClick={() => navigate('/')}
          className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-full transition">
          Go Home 🏠
        </button>
        <button onClick={() => navigate('/destinations')}
          className="bg-white border-2 border-blue-700 text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition">
          Explore Destinations
        </button>
      </div>
    </div>
  )
}

export default NotFound