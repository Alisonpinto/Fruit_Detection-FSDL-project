import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6">
            {/* Animated Logo Container */}
            <div className="relative mb-8">
                <div className="w-24 h-24 bg-primary-green rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </div>
                {/* Scanning Ring Animation */}
                <div className="absolute inset-0 -m-4 border-4 border-primary-green opacity-20 rounded-full animate-ping"></div>
            </div>

            <div className="text-center space-y-4 max-w-xs">
                <h2 className="text-2xl font-black text-dark-text tracking-tight uppercase">
                    GLENN <span className="text-primary-green">AI</span>
                </h2>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-lg font-bold text-gray-600">Analyzing Quality</p>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce"></div>
                    </div>
                </div>

                <p className="text-sm text-gray-400 font-medium">
                    Applying neural models to assess ripeness and market readiness...
                </p>
            </div>

            {/* Aesthetic Footer Decor */}
            <div className="absolute bottom-12 flex gap-12 opacity-10">
                <div className="text-4xl text-primary-green">🍎</div>
                <div className="text-4xl text-primary-green">🥭</div>
                <div className="text-4xl text-primary-green">🥑</div>
            </div>
        </div>
    );
};

export default LoadingScreen;
