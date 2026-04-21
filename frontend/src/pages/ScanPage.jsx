import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'

function ScanPage() {
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState(null)

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const streamRef = useRef(null)

  const navigate = useNavigate()

  const startCamera = async () => {
    setError(null)
    setPreviewUrl(null)
    setImageFile(null)
    setCameraActive(true)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })

      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Unable to access camera. Please allow permissions.")
      setCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured_image.png", { type: "image/png" })
          setImageFile(file)
          const url = URL.createObjectURL(blob)
          setPreviewUrl(url)
        }
      }, 'image/png')

      stopCamera()
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImageFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      stopCamera()
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current.click()
  }

  const handleAnalyze = () => {
    if (!imageFile) return
    setIsAnalyzing(true)
    navigate('/result', {
      state: { image: imageFile, previewUrl: previewUrl }
    })
  }

  return (
    <div className="min-h-screen bg-[#fcfdfc] font-sans text-slate-800 flex flex-col items-center">
      {isAnalyzing && <LoadingScreen />}

      {/* Modern Sticky Header */}
      <nav className="sticky top-0 w-full z-[60] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center">
        <Link to="/" className="p-2 text-slate-400 hover:text-emerald-600 transition-colors absolute left-4 bg-slate-50 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1 text-center">
          <span className="text-xl font-black text-slate-900 tracking-tighter">FRUITRA<span className="text-emerald-500">.</span></span>
        </div>
      </nav>

      <main className="w-full max-w-[480px] flex-grow flex flex-col px-6 pt-6 pb-8 justify-between">
        
        {/* Title Group - Tightened */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 mb-1">Analyze Fruit</h2>
          <p className="text-sm text-slate-400 font-medium">Position the fruit clearly in the frame</p>
        </div>

        {/* AI Viewfinder Container */}
        <div className="relative w-full aspect-[4/5] rounded-[2.5rem] shadow-2xl overflow-hidden border-[6px] border-white bg-slate-900 flex items-center justify-center group">
          
          {/* Viewfinder Corners (UI Overlay) */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-50">
             <div className="absolute top-8 left-8 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg"></div>
             <div className="absolute top-8 right-8 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg"></div>
             <div className="absolute bottom-8 left-8 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg"></div>
             <div className="absolute bottom-8 right-8 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-lg"></div>
          </div>

          {error ? (
            <div className="text-center p-8 z-20">
              <p className="text-red-400 text-sm mb-4 font-medium">{error}</p>
              <button onClick={startCamera} className="bg-white/10 text-white px-6 py-2 rounded-full backdrop-blur-md text-xs font-bold hover:bg-white/20 transition">Retry Camera</button>
            </div>
          ) : cameraActive ? (
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          ) : previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover animate-fade-in" />
          ) : (
            <div className="flex flex-col items-center z-20">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Awaiting Input</span>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controls Section */}
        <div className="mt-8 space-y-4">
          
          {/* Capture Circle (Visible when camera is on) */}
          {cameraActive && (
            <div className="flex justify-center -mt-16 mb-6 relative z-30">
              <button
                onClick={handleCapture}
                className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl border-[6px] border-white active:scale-90 transition-transform"
              >
                <div className="w-14 h-14 rounded-full border-2 border-emerald-300 flex items-center justify-center">
                   <div className="w-10 h-10 bg-white rounded-full"></div>
                </div>
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={startCamera}
              className={`flex-1 py-4 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all border-2
                ${cameraActive
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                  : 'border-slate-100 bg-white text-slate-600 hover:bg-slate-50'
                }`}
            >
              Camera
            </button>
            <button
              onClick={triggerFileUpload}
              className="flex-1 py-4 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider bg-white text-slate-600 hover:bg-slate-50 transition-all border-2 border-slate-100"
            >
              Gallery
            </button>
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!previewUrl}
            className={`w-full py-4 text-sm font-black rounded-2xl uppercase tracking-[0.2em] shadow-xl transition-all
              ${previewUrl
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
          >
            Analyze Now
          </button>
          
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            AI-Powered Quality Grading
          </p>
        </div>
      </main>
    </div>
  )
}

export default ScanPage;