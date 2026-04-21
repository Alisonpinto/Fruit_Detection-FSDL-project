import React from 'react';

function ResultCard({ results, image }) {
    if (!results || !image) return null;

    // Logic for dynamic styling based on condition
    const isGoodCondition = results.condition.toLowerCase() === 'good' || results.condition.toLowerCase() === 'ripe';

    return (
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden w-full transition-all duration-500 hover:shadow-emerald-100/50">
            <div className="flex flex-col lg:flex-row">
                
                {/* Left Side: Image with Overlay */}
                <div className="lg:w-1/2 relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10 lg:hidden" />
                    <div className="w-full aspect-square lg:h-full overflow-hidden">
                        <img
                            src={image}
                            alt={results.fruit}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    {/* Floating Quality Badge on Image (Mobile) */}
                    <div className="absolute top-4 left-4 z-20 lg:hidden">
                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md shadow-lg border ${
                            isGoodCondition 
                            ? 'bg-emerald-500/90 text-white border-emerald-400' 
                            : 'bg-rose-500/90 text-white border-rose-400'
                        }`}>
                            {results.condition}
                        </span>
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
                    
                    {/* Header: Title and Status */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                             <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em]">AI Analysis Result</span>
                             <span className="text-[10px] font-mono text-slate-300">ID: #SCAN-{Math.floor(Math.random()*9000)+1000}</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-none tracking-tighter">
                            {results.fruit}
                        </h1>
                    </div>

                    {/* Condition Description */}
                    <div className="mb-8">
                        <p className="text-slate-500 leading-relaxed font-medium">
                            {results.description || `Our neural network identified this crop as ${results.fruit} with symptoms indicating ${results.condition} condition.`}
                        </p>
                    </div>

                    {/* Data Points Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                            <p className={`text-sm font-black ${isGoodCondition ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {results.condition.toUpperCase()}
                            </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Quality Score</p>
                            <p className="text-sm font-black text-slate-900">
                                {isGoodCondition ? 'A+' : 'B-'}
                            </p>
                        </div>
                    </div>

                    {/* Confidence Meter */}
                    <div className="mt-auto pt-8 border-t border-slate-100">
                        <div className="flex justify-between items-end mb-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Confidence</p>
                            <span className="text-3xl font-black text-slate-900">{results.confidence}<span className="text-emerald-500 text-lg">%</span></span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all duration-1000 ease-out"
                                style={{ width: `${results.confidence}%` }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ResultCard;