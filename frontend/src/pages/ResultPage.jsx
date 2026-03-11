import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ResultCard from '../components/ResultCard'
import { detectFruits } from '../services/fruitDetectionService'

function ResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { image, previewUrl } = location.state || {}
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageUrl, setImageUrl] = useState(previewUrl)

  useEffect(() => {
    console.log("ResultPage mounted with:", { image, previewUrl })
    
    if (!image) {
      console.warn("No image found in location.state")
      navigate('/scan')
      return
    }

    // Create image URL from File object if previewUrl wasn't passed
    if (!imageUrl && image instanceof File) {
      const url = URL.createObjectURL(image)
      console.log("Created object URL:", url)
      setImageUrl(url)
    }

    // Call backend API with the image file
    const analyzeImage = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Call the service with the actual File object
        const response = await detectFruits(image)
        
        // Transform response to match ResultCard format
        const formattedResult = {
          fruit: response.fruit,
          condition: response.condition,
          description: `Detected ${response.fruit} in ${response.condition} condition.`,
          confidence: response.confidence
        }

        
        setResult(formattedResult)
      } catch (err) {
        setError(err.message || 'Failed to analyze image. Please try again.')
        console.error('Analysis error:', err)
      } finally {
        setLoading(false)
      }
    }

    analyzeImage()
  }, [image, navigate, imageUrl])

  if (!image) return null

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-bg font-sans text-dark-text flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-primary-green">Analyzing your fruit...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-bg font-sans text-dark-text pb-12">
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
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-lg">
              <p className="text-red-700 font-semibold mb-2">Error</p>
              <p className="text-red-600">{error}</p>
            </div>

            <div className="mt-8 w-full max-w-lg flex flex-col gap-4">
              <Link to="/scan" className="w-full">
                <button className="w-full py-4 text-lg font-bold rounded-2xl bg-primary-green text-white uppercase tracking-wide shadow-lg hover:bg-light-green hover:shadow-xl hover:-translate-y-1 transition-all transform">
                  Try Again
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!result) return null

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
          <ResultCard results={result} image={imageUrl} />

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
