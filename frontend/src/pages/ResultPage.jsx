import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ResultCard from '../components/ResultCard'

function ResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { image } = location.state || {}

  useEffect(() => {
    if (!image) {
      navigate('/scan')
    }
  }, [image, navigate])

  // Dummy results based on requested format
  const dummyResult = {
    fruit: "Mango",
    breed: "Alphonso",
    description: "Alphonso mango is known for its sweetness and rich aroma. It is widely grown in tropical regions and preferred in premium markets.",
    readyToEat: true,
    marketReady: false,
    confidence: 92
  }

  if (!image) return null

  return (
    <div className="min-h-screen bg-soft-bg font-sans text-dark-text pb-12">
      {/* Custom Header for Result Page */}
      <nav className="sticky top-0 z-[60] bg-white shadow-sm px-6 py-4 flex items-center mb-10">
        <Link to="/scan" className="p-2 text-dark-text hover:text-primary-green transition-colors absolute left-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div className="flex-1 text-center">
          <span className="text-2xl font-black text-primary-green tracking-tighter">GLENN</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center">
          {/* Main Section: Result Card */}
          <ResultCard results={dummyResult} image={image} />

          <div className="mt-12 w-full max-w-lg flex flex-col gap-4">
            <Link to="/scan" className="w-full">
              <button className="w-full py-4 text-lg font-bold rounded-2xl bg-primary-green text-white uppercase tracking-wide shadow-lg hover:bg-light-green hover:shadow-xl hover:-translate-y-1 transition-all transform">
                Scan Again
              </button>
            </Link>
            <Link to="/" className="w-full text-center">
              <button className="w-full py-3 text-base font-semibold text-gray-500 hover:text-primary-green transition-colors">
                Go Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
