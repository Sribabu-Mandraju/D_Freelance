
"use client";
import { Cpu } from "lucide-react";
import ProjectCard from "./ProjectCard";

function FeaturesProjects({ featuredProjects }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
          <div className="p-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg mr-3 border border-purple-500/30">
            <Cpu className="w-6 h-6 text-purple-400" />
          </div>
          Featured Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredProjects.length > 0 ? (
          featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isEditing={false} // Ensure view-only mode
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm col-span-full">
            No projects available
          </p>
        )}
      </div>
    </div>
  );
}

export default FeaturesProjects;
