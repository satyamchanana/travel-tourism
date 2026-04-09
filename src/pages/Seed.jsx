import { seedDestinations } from '../utils/seedDestinations'
import { useState } from 'react'

const Seed = () => {
  const [status, setStatus] = useState('')

  const handleSeed = async () => {
    setStatus('Seeding...')
    try {
      await seedDestinations()
      setStatus('✅ Done! All 12 destinations added to Firestore.')
    } catch (e) {
      setStatus('❌ Error: ' + e.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Seed Destinations Database</h1>
      <p className="text-gray-500">Click once only — this adds all destinations to Firestore</p>
      <button onClick={handleSeed}
        className="bg-blue-700 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-blue-600 transition">
        Seed Now 🚀
      </button>
      {status && <p className="text-lg font-semibold text-gray-700">{status}</p>}
    </div>
  )
}

export default Seed