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
    // Cleanup on unmount
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

    // Simulate analysis delay
    setTimeout(() => {
      navigate('/result', {
        state: { image: imageFile, previewUrl: previewUrl }
      })
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-dark-text flex flex-col items-center">
      {/* Show Loading Screen Overlay */}
      {isAnalyzing && <LoadingScreen />}

      {/* Consistent Header for Scan Page */}
      <nav className="sticky top-0 w-full z-[60] bg-white shadow-sm px-6 py-4 flex items-center mb-4">
        <Link to="/" className="p-2 text-dark-text hover:text-primary-green transition-colors absolute left-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div className="flex-1 text-center">
          <span className="text-2xl font-black text-primary-green tracking-tighter">GLENN</span>
        </div>
      </nav>

      <main className="w-full max-w-[480px] flex flex-col px-6 pt-4 pb-10">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary-green mb-2">Scan Your Fruit</h2>
          <p className="text-sm text-gray-500">Align fruit within the frame for AI detection</p>
        </div>

        {/* Camera Container */}
        <div className="w-full aspect-[4/5] bg-gray-100 rounded-[20px] shadow-soft mb-8 overflow-hidden relative border border-gray-100 flex items-center justify-center">
          {error ? (
            <div className="text-center p-6">
              <p className="text-red-500 mb-4">{error}</p>
              <button onClick={startCamera} className="text-primary-green font-bold underline">Retry</button>
            </div>
          ) : cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center opacity-40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">No Image Selected</span>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6">
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={startCamera}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all border-2
                ${cameraActive
                  ? 'border-primary-green bg-green-50 text-primary-green shadow-inner'
                  : 'border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Scan with Camera
            </button>
            <button
              onClick={triggerFileUpload}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all border-2 border-transparent"
            >
              Upload from Gallery
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>

          {/* Capture Button (Only visible when camera is active) */}
          {cameraActive && (
            <div className="flex justify-center -mt-2 mb-2 animate-fade-in">
              <button
                onClick={handleCapture}
                className="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(72,187,120,0.5)] hover:shadow-[0_0_30px_rgba(72,187,120,0.7)] hover:scale-105 transition-all active:scale-95 border-4 border-white ring-4 ring-green-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!previewUrl}
            className={`w-full py-4 text-lg font-bold rounded-2xl uppercase tracking-wide shadow-lg transition-all transform
              ${previewUrl
                ? 'bg-primary-green text-white hover:bg-light-green hover:shadow-xl hover:-translate-y-1'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
          >
            Analyze Fruit
          </button>
        </div>
      </main>
    </div>
  )
}

export default ScanPage
