import { Github, ExternalLink, Trash2 } from 'lucide-react';

function ProjectCard({ project, isEditing, onUpdate, onRemove }) {
  return (
    <div className="group bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2">
      {/* Animated border */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm"></div>

      {/* Delete button when editing */}
      {isEditing && (
        <button
          onClick={() => onRemove(project.id)}
          className="absolute top-2 right-2 p-1 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors duration-300 z-20"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      )}

      <div className="relative z-10">
        <div className="flex items-start flex-col gap-4 mb-4">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="text-3xl p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                {isEditing ? (
                  <input
                    type="text"
                    value={project.icon}
                    onChange={(e) => onUpdate(project.id, "icon", e.target.value)}
                    className="bg-transparent text-3xl w-8 text-center focus:outline-none"
                  />
                ) : (
                  project.icon
                )}
              </div>
              <div className="w-full">
                {isEditing ? (
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => onUpdate(project.id, "name", e.target.value)}
                    className="font-bold text-white text-lg bg-gray-900/50 border border-gray-700 rounded px-2 py-1 w-full focus:border-cyan-400 focus:outline-none"
                  />
                ) : (
                  <h3 className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors duration-300">
                    {project.name}
                  </h3>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={project.category}
                    onChange={(e) => onUpdate(project.id, "category", e.target.value)}
                    className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20 mt-1 focus:outline-none"
                  />
                ) : (
                  <span className="text-[10px] w-auto text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20">
                    {project.category}
                  </span>
                )}
              </div>
            </div>
          </div>
          {isEditing ? (
            <textarea
              value={project.description}
              onChange={(e) => onUpdate(project.id, "description", e.target.value)}
              className="text-[13px] text-gray-300 bg-gray-900/50 border border-gray-700 rounded px-3 py-2 w-full focus:border-cyan-400 focus:outline-none resize-none"
              rows="3"
            />
          ) : (
            <p className="text-[13px] text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600/50 hover:border-cyan-500/50 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-500/30">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-2">
            <input
              type="url"
              value={project.githubUrl}
              onChange={(e) => onUpdate(project.id, "githubUrl", e.target.value)}
              placeholder="GitHub URL"
              className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="url"
              value={project.liveUrl}
              onChange={(e) => onUpdate(project.id, "liveUrl", e.target.value)}
              placeholder="Live Demo URL"
              className="w-full bg-gray-900/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2 py-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 text-white text-sm rounded-lg transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50 group/btn justify-center"
            >
              <Github className="w-4 h-4 group-hover/btn:text-cyan-400 transition-colors duration-300" />
              Code
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full sm:w-auto gap-2 px-2 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 text-xs rounded-lg transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500/50 shadow-lg shadow-cyan-500/20 group/btn justify-center"
              >
                <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                LiveDemo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
