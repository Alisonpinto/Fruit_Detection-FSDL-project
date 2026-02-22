import { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex justify-between items-center">
      {/* Left: Logo & Brand */}
      <Link to="/" className="flex items-center gap-3 decoration-none">
        <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center shadow-sm">
          {/* Simple Leaf Icon Placeholder */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <span className="text-xl font-bold text-dark-text tracking-tight">GLENN</span>
      </Link>

      {/* Right: Hamburger Menu */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-dark-text p-1 hover:bg-light-green rounded-lg transition-colors focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu Dropdown (Optional/Placeholder for functionality) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 flex flex-col items-center gap-4 border-t border-gray-100 animate-fade-in-down">
          <Link to="/" className="text-dark-text font-medium hover:text-primary-green" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/scan" className="text-dark-text font-medium hover:text-primary-green" onClick={() => setIsMenuOpen(false)}>Scan</Link>
          <Link to="/result" className="text-dark-text font-medium hover:text-primary-green" onClick={() => setIsMenuOpen(false)}>Results</Link>
        </div>
      )}
    </header>
  )
}

export default Header
