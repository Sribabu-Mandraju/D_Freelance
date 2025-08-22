const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {skeletonMessages.map((_, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <div key={idx} className={`flex ${isEven ? "justify-start" : "justify-end"} animate-pulse`}>
            <div className={`flex items-end gap-3 max-w-xs lg:max-w-md ${
              isEven ? "flex-row" : "flex-row-reverse"
            }`}>
              {/* Avatar skeleton */}
              <div className="flex-shrink-0">
                <div className="size-10 rounded-full bg-slate-700/50 border-2 border-slate-600/30"></div>
              </div>

              {/* Message content skeleton */}
              <div className={`flex flex-col ${isEven ? "items-start" : "items-end"}`}>
                {/* Timestamp skeleton */}
                <div className={`h-3 w-16 bg-slate-700/50 rounded mb-2 ${isEven ? "ml-2" : "mr-2"}`}></div>
                
                {/* Message bubble skeleton */}
                <div className={`px-4 py-3 rounded-2xl backdrop-blur-sm border ${
                  isEven 
                    ? "bg-slate-800/40 border-slate-600/30 rounded-bl-md" 
                    : "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-400/20 rounded-br-md"
                }`}>
                  <div className={`h-4 bg-slate-600/50 rounded ${
                    idx % 3 === 0 ? "w-32" : idx % 3 === 1 ? "w-24" : "w-28"
                  } mb-1`}></div>
                  {idx % 4 === 0 && (
                    <div className="h-3 w-20 bg-slate-600/50 rounded"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;