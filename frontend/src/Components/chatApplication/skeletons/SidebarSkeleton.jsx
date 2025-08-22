import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-full lg:w-80 bg-slate-900/60 backdrop-blur-sm border-r border-cyan-400/30 flex flex-col transition-all duration-300 shadow-lg">
      {/* Enhanced Header Skeleton */}
      <div className="border-b border-cyan-400/30 w-full p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="p-2 bg-slate-700/50 rounded-lg">
            <Users className="size-6 text-slate-500" />
          </div>
          <div className="hidden lg:block h-6 w-24 bg-slate-700/50 rounded"></div>
        </div>
        
        {/* Filter toggle skeleton */}
        <div className="mt-4 hidden lg:flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-6 bg-slate-700/50 rounded-full"></div>
            <div className="h-4 w-20 bg-slate-700/50 rounded"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-slate-700/50 rounded-full"></div>
            <div className="h-3 w-12 bg-slate-700/50 rounded"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-4 mx-2 mb-2 flex items-center gap-4 rounded-xl animate-pulse">
            {/* Enhanced Avatar skeleton */}
            <div className="relative flex-shrink-0">
              <div className="size-12 bg-slate-700/50 rounded-full border-2 border-slate-600/30"></div>
              {/* Random online indicator for some items */}
              {idx % 3 === 0 && (
                <div className="absolute -bottom-1 -right-1">
                  <div className="size-4 bg-slate-600/50 rounded-full"></div>
                </div>
              )}
            </div>

            {/* Enhanced User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className={`h-4 bg-slate-700/50 rounded mb-2 ${
                idx % 4 === 0 ? "w-32" : idx % 4 === 1 ? "w-28" : idx % 4 === 2 ? "w-36" : "w-24"
              }`}></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-600/50 rounded-full"></div>
                <div className="h-3 w-16 bg-slate-600/50 rounded"></div>
              </div>
            </div>
            
            {/* Mobile indicator skeleton */}
            <div className="lg:hidden">
              {idx % 3 === 0 && (
                <div className="w-3 h-3 bg-slate-600/50 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;