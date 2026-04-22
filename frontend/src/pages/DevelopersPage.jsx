import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function DevelopersPage() {
  const developers = [
    {
      name: "Alison Pinto",
      role: "UI/UI Designer and Developer",
      bio: "A developer with a passion for creating beautiful and user-friendly interfaces.",
      image: "/alisonpinto.jpg", 
      color: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      name: "Glenn Pinto",
      role: "ML Trainer and Developer",
      bio: "A developer with a passion for building intelligent systems.",
      image: "/glenn.jpeg", 
      color: "bg-blue-50",
      textColor: "text-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfc] font-sans text-slate-800 flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em] bg-emerald-50 px-4 py-2 rounded-full">The Team</span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 tracking-tight">Meet the Developers</h1>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            The minds behind Fruitra, working together to revolutionize agriculture through artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {developers.map((dev, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-slate-200 to-slate-50 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white border border-slate-100 p-8 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center">
                
                {/* Profile Image Container */}
                <div className={`w-40 h-40 ${dev.color} rounded-[2.5rem] overflow-hidden mb-8 border-4 border-white shadow-inner`}>
                  <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                </div>

                <div className="text-center">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${dev.textColor} bg-opacity-10 py-1 px-3 rounded-full mb-2 inline-block`}>
                    {dev.role}
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mb-4">{dev.name}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {dev.bio}
                  </p>
                </div>

                {/* Social Placeholder */}
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
          The Fruitra Project • 2026<br/>
          Empowering Farmers Worldwide
        </p>
      </footer>
    </div>
  );
}

export default DevelopersPage;
