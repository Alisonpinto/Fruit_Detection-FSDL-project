function ResultCard({ results, image }) {
    if (!results || !image) return null;

    const getMarketStatusBadge = (marketReady) => {
        if (marketReady === true) {
            return <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase tracking-widest">Market Ready</span>;
        } else if (marketReady === 'almost') {
            return <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700 uppercase tracking-widest">Almost Ready</span>;
        } else {
            return <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-700 uppercase tracking-widest">Not Ready</span>;
        }
    };

    return (
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-50 overflow-hidden max-w-5xl w-full mx-auto">
            <div className="flex flex-col md:flex-row p-6 gap-8">
                {/* Left Side: Image */}
                <div className="md:w-1/2 flex items-center justify-center">
                    <div className="w-full aspect-square md:aspect-[4/5] overflow-hidden rounded-[16px] shadow-sm">
                        <img
                            src={image}
                            alt={results.fruit}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="md:w-1/2 flex flex-col justify-center">
                    <div className="mb-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-2 tracking-tight">
                            {results.fruit}
                        </h1>
                        <p className="text-lg font-bold text-primary-green opacity-80 uppercase tracking-widest">
                            {results.breed}
                        </p>
                    </div>

                    <div className="mb-8">
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {results.description || "No description available for this fruit."}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-8">
                        {/* Ready to Eat Badge */}
                        {results.readyToEat ? (
                            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase tracking-widest">Ready to Eat</span>
                        ) : (
                            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-400 uppercase tracking-widest">Not Ready to Eat</span>
                        )}

                        {/* Market Ready Badge */}
                        {getMarketStatusBadge(results.marketReady)}
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                        <p className="text-lg font-medium text-gray-500">
                            Confidence: <span className="text-primary-green font-bold text-2xl ml-2">{results.confidence}%</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultCard;
