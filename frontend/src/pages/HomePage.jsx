// GLENN Home Page - Modernized UI
import { Link } from "react-router-dom";
import Header from "../components/Header";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#fcfdfc] font-sans text-slate-800 flex flex-col selection:bg-emerald-100">
      
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-3xl opacity-50" />
      </div>

      <Header />

      <main className="relative z-10 flex-grow w-full flex justify-center">
        <div className="w-full max-w-[1200px] flex flex-col gap-24 px-6 pt-12 pb-24">

          {/* HERO SECTION - Tightened for Mobile, No empty space */}
<section className="flex-grow flex flex-col justify-center lg:grid lg:grid-cols-2 lg:gap-16">
  
  {/* IMAGE SECTION - Occupies more width and sits higher */}
  <div className="relative order-1 w-full flex justify-center pt-2 lg:pt-0">
    <div className="relative w-[92%] max-w-[400px] lg:max-w-none">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-200 to-teal-100 rounded-[2rem] blur-xl opacity-40" />
      
      <img
        src="https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?q=80&w=2069&auto=format&fit=crop"
        alt="Farmer harvesting"
        className="relative rounded-[2rem] shadow-2xl w-full h-[220px] xs:h-[260px] lg:h-[500px] object-cover border-[6px] border-white"
      />

      {/* Modern Floating Badge */}
      <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-white/20">
        <p className="text-[10px] font-bold text-white uppercase tracking-wider">AI Active</p>
      </div>
    </div>
  </div>

  {/* TEXT & BUTTON CONTENT - Brought closer to the image */}
  <div className="text-center lg:text-left flex flex-col items-center lg:items-start order-2 mt-6 lg:mt-0 px-4">
    
    <h1 className="text-[28px] xs:text-3xl md:text-6xl font-black text-slate-900 mb-2 leading-tight tracking-tight">
      Fruit Quality <br className="lg:block" /> 
      <span className="text-emerald-600">
        AI Detection
      </span>
    </h1>

    <p className="text-[15px] md:text-lg text-slate-500 mb-6 leading-snug max-w-[300px] xs:max-w-sm lg:max-w-lg">
      Scan fruits instantly to detect ripeness and market quality using your phone.
    </p>

    {/* START SCANNING BUTTON - Unchanged as requested */}
    <div className="flex w-full justify-center lg:justify-start">
      <Link to="/scan">
        <button className="bg-primary-green hover:bg-[#174e32] text-white font-semibold py-4 px-12 rounded-full shadow-lg hover:shadow-xl flex items-center gap-3 transition-all active:scale-95">
          Start Scanning
        </button>
      </Link>
    </div>

    <p className="text-slate-400 text-[11px] mt-4 font-medium">
      No extra devices required.
    </p>
  </div>
</section>

          {/* FEATURES GRID */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                Tools Built for the Modern Field
              </h2>
              <p className="text-slate-500 italic">"Technology that speaks the language of the soil."</p>
            </div>

            <div className="grid md:grid-cols-8 lg:grid-cols-4 gap-6">
              <FeatureCard icon="⚡" title="Quick Scan" desc="Instant results with zero latency." color="bg-orange-50" />
              <FeatureCard icon="🎯" title="Neural Precision" desc="Advanced deep-learning models." color="bg-blue-50" />
              <FeatureCard icon="🧬" title="Variety ID" desc="Identifies species automatically." color="bg-purple-50" />
              <FeatureCard icon="📈" title="Market Data" desc="Real-time value forecasting." color="bg-emerald-50" />
            </div>
          </section>

          {/* FARMER BENTO BOX */}
          <section className="bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl">
            <div className="lg:w-1/2 relative group">
              <img
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2070&auto=format&fit=crop"
                alt="Farmer working"
                className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent" />
            </div>

            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
              <h2 className="text-3xl font-bold text-white mb-6">Empowering the <br/><span className="text-emerald-400 underline decoration-emerald-500/30">Next Harvest</span></h2>
              <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                GLENN isn't just an app; it's a digital companion. We help you reduce waste by up to 30% by identifying the exact moment of peak ripeness.
              </p>
              <div className="grid grid-cols-2 gap-6 border-t border-slate-800 pt-8">
                <div>
                  <p className="text-2xl font-bold text-white">40k+</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Scans Daily</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">12+</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Countries</p>
                </div>
              </div>
            </div>
          </section>

          {/* STEPPER SECTION */}
          <section>
            <div className="grid md:grid-cols-3 gap-12">
              <StepCard number="01" title="Visual Capture" desc="Align the fruit within the frame markers." />
              <StepCard number="02" title="Cloud Analysis" desc="Neural networks process texture and hue." />
              <StepCard number="03" title="Actionable Data" desc="Get grading and storage recommendations." />
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">🌱</div>
              <span className="text-xl font-black tracking-tighter text-slate-900">GLENN.</span>
            </div>
            <div className="flex gap-8 font-medium text-slate-500 text-sm">
              <a href="#" className="hover:text-emerald-600 transition">Privacy</a>
              <a href="#" className="hover:text-emerald-600 transition">Terms</a>
              <a href="#" className="hover:text-emerald-600 transition">Support</a>
            </div>
          </div>
          <div className="text-center text-xs text-slate-400 font-medium">
            © 2026 GLENN Agriculture Systems • Made for a Sustainable Future
          </div>
        </div>
      </footer>
    </div>
  );
}

/* REFINED COMPONENTS */

function FeatureCard({ icon, title, desc, color }) {
  return (
    <div className={`${color} p-8 rounded-3xl border border-white hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group`}>
      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-6 group-hover:rotate-12 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function StepCard({ number, title, desc }) {
  return (
    <div className="relative group">
      <span className="text-6xl font-black text-slate-100 absolute -top-8 -left-4 z-0 group-hover:text-emerald-50 transition-colors">
        {number}
      </span>
      <div className="relative z-10">
        <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default HomePage;