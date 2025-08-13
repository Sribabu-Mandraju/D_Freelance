import { useState } from 'react';
import { Cpu, Edit, Save, X, Plus } from 'lucide-react';
import ProjectCard from './PrjectCard';

function FeaturedProjects({ featuredProjects, setFeaturedProjects }) {
  const [isEditingProjects, setIsEditingProjects] = useState(false);
  const [editProjects, setEditProjects] = useState(featuredProjects);

  const handleEditProjects = () => {
    setIsEditingProjects(true);
    setEditProjects([...featuredProjects]);
  };

  const handleSaveProjects = () => {
    setFeaturedProjects(editProjects);
    setIsEditingProjects(false);
  };

  const handleCancelProjects = () => {
    setEditProjects([...featuredProjects]);
    setIsEditingProjects(false);
  };

  const addNewProject = () => {
    const newProject = {
      id: Date.now(),
      name: "New Project",
      description: "Project description here...",
      technologies: ["React"],
      liveUrl: "",
      githubUrl: "",
      icon: "🚀",
      category: "Web App",
    };
    setEditProjects([...editProjects, newProject]);
  };

  const updateProject = (id, field, value) => {
    setEditProjects(prev =>
      prev.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const removeProject = (id) => {
    setEditProjects(prev => prev.filter(project => project.id !== id));
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500"></div> */}

      {/* Section Header with Edit Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
          <div className="p-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg mr-3 border border-purple-500/30">
            <Cpu className="w-6 h-6 text-purple-400" />
          </div>
          Featured Projects
        </h2>

        {!isEditingProjects ? (
          <button
            onClick={handleEditProjects}
            className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 border border-purple-500/50 hover:border-purple-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(147,51,234,0.3)] group w-full sm:w-auto justify-center"
          >
            <Edit className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400">Edit</span>
          </button>
        ) : (
          <div className="flex w-full sm:w-auto gap-2">
            <button
              onClick={addNewProject}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-blue-500/50 hover:border-blue-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] group"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">Add</span>
            </button>
            <button
              onClick={handleSaveProjects}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-green-500/50 hover:border-green-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)] group"
            >
              <Save className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Save</span>
            </button>
            <button
              onClick={handleCancelProjects}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-gray-900/50 border border-red-500/50 hover:border-red-400 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] group"
            >
              <X className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(isEditingProjects ? editProjects : featuredProjects).map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            isEditing={isEditingProjects}
            onUpdate={updateProject}
            onRemove={removeProject}
          />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProjects;
