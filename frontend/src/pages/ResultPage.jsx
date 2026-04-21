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
    if (!image) {
      navigate('/scan')
      return
    }

    if (!imageUrl && image instanceof File) {
      const url = URL.createObjectURL(image)
      setImageUrl(url)
    }

    const analyzeImage = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await detectFruits(image)
        
        const formattedResult = {
          fruit: response.fruit,
          condition: response.condition,
          description: `Detected ${response.fruit} in ${response.condition} condition.`,
          confidence: response.confidence
        }
        setResult(formattedResult)
      } catch (err) {
        let msg = err.message || 'Failed to analyze image. Please try again.'
        if (msg.toLowerCase().includes('failed to fetch')) {
          msg = `Server not reachable. Please ensure your backend is running at http://${window.location.hostname}:5000 and your phone is on the same Wi-Fi.`
        }
        setError(msg)
      } finally {
        setLoading(false)
      }
    }

    analyzeImage()
  }, [image, navigate, imageUrl])

  if (!image) return null

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfc] font-sans flex flex-col items-center justify-center px-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-2xl">🌱</span>
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-black text-slate-900 tracking-tight">AI is Analyzing</h2>
        <p className="mt-2 text-slate-400 font-medium animate-pulse">Running neural networks...</p>
      </div>
    )
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <div className="min-h-screen bg-[#fcfdfc] font-sans text-slate-800 flex flex-col items-center">
        <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center">
          <Link to="/scan" className="p-2 text-slate-400 bg-slate-50 rounded-full absolute left-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1 text-center font-black tracking-tighter text-xl">FRUITRA<span className="text-emerald-500">.</span></div>
        </nav>

        <div className="flex-grow flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center text-3xl mb-6">⚠️</div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Analysis Failed</h2>
          <p className="text-slate-500 max-w-xs mb-8">{error}</p>
          <Link to="/scan" className="w-full max-w-[280px]">
            <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl active:scale-95 transition-all">
              Try Again
            </button>
          </Link>
        </div>
      </div>
    )
  }

  // --- SUCCESS STATE ---
  return (
    <div className="min-h-screen bg-[#fcfdfc] font-sans text-slate-800 flex flex-col items-center pb-12">
      <nav className="sticky top-0 z-[60] w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center mb-6">
        <Link to="/scan" className="p-2 text-slate-400 bg-slate-50 rounded-full absolute left-4 hover:text-emerald-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1 text-center font-black tracking-tighter text-xl text-slate-900">
          FRUITRA<span className="text-emerald-500">.</span>
        </div>
      </nav>

      <main className="w-full max-w-6xl px-6 flex flex-col items-center">
        {/* Header Title */}
        <div className="text-center mb-8">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50 px-3 py-1 rounded-full">Analysis Complete</span>
            <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">Detection Result</h2>
        </div>

        {/* Main Section: Result Card */}
        <div className="w-full transform transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          <ResultCard results={result} image={imageUrl} />
        </div>

        {/* Action Buttons Container */}
        <div className="mt-10 w-full flex flex-col gap-4">
          <Link to="/scan" className="w-full">
            <button className="w-full py-4 text-sm font-black rounded-2xl bg-emerald-600 text-white uppercase tracking-[0.2em] shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all">
              Scan Another Fruit
            </button>
          </Link>
          
          <Link to="/" className="w-full">
            <button className="w-full py-4 text-sm font-bold rounded-2xl bg-white text-slate-500 border-2 border-slate-100 hover:bg-slate-50 active:scale-[0.98] transition-all">
              Return to Dashboard
            </button>
          </Link>
        </div>

        <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
          Verified by Fruitra Engine v3.0
        </p>
      </main>
    </div>
  )
}

export default ResultPage