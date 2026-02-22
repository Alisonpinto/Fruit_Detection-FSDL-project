// GLENN Home Page - Mobile First Design
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function HomePage() {
  return (
    <div className="min-h-screen bg-light-green font-sans text-dark-text flex flex-col items-center">
      <Header />
      <main className="w-full flex justify-center">
        <div className="w-full max-w-[480px] flex flex-col gap-6 px-6 pt-6 pb-20">

          {/* Hero Section */}
          <section className="px-2">
            {/* Banner Image */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-soft mb-6">
              <img
                src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop"
                alt="Fresh Fruits Farm"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div className="text-center px-2">
              <p className="text-accent-green font-bold tracking-[0.2em] uppercase text-xs mb-3">
                SMART AGRICULTURE AI
              </p>
              <h1 className="text-3xl font-extrabold text-primary-green mb-3 leading-tight">
                AI Fruit Quality <br /> Detection
              </h1>
              <p className="text-base text-muted-text mb-6 leading-relaxed max-w-xs mx-auto">
                Scan your fruit and get instant quality analysis right from your palm.
              </p>

              <Link to="/scan" className="block w-full max-w-xs mx-auto">
                <button className="w-full bg-primary-green hover:bg-[#154d2e] text-white font-bold py-4 px-6 rounded-3xl shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg tracking-wide">Start Scanning</span>
                </button>
              </Link>

              <p className="text-gray-400 text-xs mt-3">
                No hardware required. Use your smartphone camera.
              </p>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="px-2">
            <div className="mb-6 pl-2">
              <h2 className="text-xl font-bold text-dark-text inline-block relative pb-2">
                Key Features
                <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-accent-green rounded-full"></span>
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <FeatureCard
                icon="⚡"
                title="Quick Scan"
                desc="Instant quality results directly on your phone while in the field."
              />
              <FeatureCard
                icon="🎯"
                title="Accurate Results"
                desc="Powered by industry-leading AI models for high precision detection."
              />
              <FeatureCard
                icon="🧬"
                title="Breed Identification"
                desc="Automatically detect fruit variety and specific species characteristics."
              />
              <FeatureCard
                icon="📈"
                title="Market Readiness"
                desc="Know exactly when your crop is ready for the peak market value."
              />
            </div>
          </section>

          {/* Smarter Farming Section */}
          <section className="px-4 py-8 text-center bg-white/50 rounded-2xl mx-2">
            <h2 className="text-xl font-bold text-dark-text mb-3">
              Smarter Farming with AI
            </h2>
            <p className="text-sm text-muted-text max-w-xs mx-auto mb-6 leading-relaxed">
              Built to help farmers maximize their harvest value with precision technology and real-time data.
            </p>

            <div className="flex justify-center gap-4">
              <IconPlaceholder icon="🌾" />
              <IconPlaceholder icon="🚜" />
              <IconPlaceholder icon="📡" />
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-100 py-8 px-6 rounded-t-3xl shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.02)] mt-2">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-green rounded-full flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-dark-text tracking-tight">GLENN</span>
              </div>

              <div className="flex gap-6 text-sm font-medium text-muted-text">
                <a href="#" className="hover:text-primary-green transition-colors">Privacy</a>
                <span>|</span>
                <a href="#" className="hover:text-primary-green transition-colors">Support</a>
              </div>
            </div>

            <div className="text-center border-t border-gray-50 pt-6">
              <p className="text-xs text-gray-400">
                © 2024 GLENN Agriculture Systems. All rights reserved.
              </p>
            </div>
          </footer>

        </div>
      </main>
    </div>
  )
}

// Helper Components for cleaner code
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-soft flex items-start gap-4 hover:shadow-hover transition-shadow duration-300">
      <div className="w-12 h-12 bg-soft-bg rounded-xl flex items-center justify-center shrink-0">
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <h3 className="font-bold text-dark-text mb-1 text-base">{title}</h3>
        <p className="text-xs text-muted-text leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function IconPlaceholder({ icon }) {
  return (
    <div className="w-14 h-14 bg-white rounded-full shadow-soft flex items-center justify-center text-2xl border border-gray-100">
      {icon}
    </div>
  )
}

export default HomePage
