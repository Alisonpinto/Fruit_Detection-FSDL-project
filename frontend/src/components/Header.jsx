import { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky w-full top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center transition-all">
      
      {/* Left: Logo & Brand */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <span className="text-xl font-black text-slate-900 tracking-tighter">
          FRUITRA<span className="text-emerald-500">.</span>
        </span>
      </Link>

      {/* Right: Hamburger Menu with subtle styling */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`p-2 rounded-xl transition-all duration-300 ${
          isMenuOpen ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown - Glassmorphism style */}
      {isMenuOpen && (
        <div className="absolute top-[calc(100%+1px)] left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl py-6 flex flex-col items-center gap-6 border-b border-slate-100 animate-in fade-in slide-in-from-top-2">
          <Link 
            to="/" 
            className="text-sm font-black uppercase tracking-widest text-slate-900 hover:text-emerald-600 transition-colors" 
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/scan" 
            className="text-sm font-black uppercase tracking-widest text-slate-900 hover:text-emerald-600 transition-colors" 
            onClick={() => setIsMenuOpen(false)}
          >
            Scan Fruit
          </Link>
          <Link 
            to="/result" 
            className="text-sm font-black uppercase tracking-widest text-slate-900 hover:text-emerald-600 transition-colors" 
            onClick={() => setIsMenuOpen(false)}
          >
            Past Results
          </Link>
          <Link 
            to="/developers" 
            className="text-sm font-black uppercase tracking-widest text-slate-900 hover:text-emerald-600 transition-colors" 
            onClick={() => setIsMenuOpen(false)}
          >
            Developers
          </Link>
          
          <div className="w-full px-10">
            <Link to="/scan" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-100">
                Launch Scanner
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header