import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 transition-all">
            
            {/* Animated Neural Scanner Container */}
            <div className="relative mb-12">
                {/* Outer Rotating Dash Ring */}
                <div className="absolute inset-0 -m-6 border-[3px] border-dashed border-emerald-200 rounded-full animate-[spin_8s_linear_infinite]"></div>
                
                {/* Middle Pulse Ring */}
                <div className="absolute inset-0 -m-2 border-4 border-emerald-500/20 rounded-full animate-ping"></div>

                {/* Core Logo Circle */}
                <div className="relative w-28 h-28 bg-slate-900 rounded-[2.5rem] flex items-center justify-center shadow-2xl rotate-45 group">
                    <div className="-rotate-45">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Text & Progress Section */}
            <div className="text-center space-y-6 max-w-xs">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                        GLENN<span className="text-emerald-500">.</span>AI
                    </h2>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em] mt-1">Neural Engine v3.0</p>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="space-y-1">
                         <p className="text-lg font-black text-slate-800 tracking-tight">Processing Image...</p>
                         <p className="text-xs text-slate-400 font-medium">Detecting texture & color variance</p>
                    </div>

                    {/* Modern Slim Progress Bar */}
                    <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full animate-[loading_2.5s_ease-in-out_infinite]"></div>
                    </div>
                </div>
            </div>

            {/* Aesthetic Tech Decor */}
            <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-30">
                <div className="flex gap-6 grayscale contrast-125">
                    <span className="text-2xl">🍎</span>
                    <span className="text-2xl">🍌</span>
                    <span className="text-2xl">🥭</span>
                </div>
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Scanning sequences in progress</p>
            </div>

            {/* Tailwind Custom Animation (Inline Style for the bar) */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes loading {
                    0% { width: 0%; left: 0%; }
                    50% { width: 100%; left: 0%; }
                    100% { width: 0%; left: 100%; }
                }
            `}} />
        </div>
    );
};

export default LoadingScreen;