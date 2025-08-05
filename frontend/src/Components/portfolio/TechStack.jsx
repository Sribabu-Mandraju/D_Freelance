import { Code, Blocks, Globe, Smartphone } from "lucide-react"

const categoryIcons = {
  blockchain: Blocks,
  frontend: Globe,
  backend: Code,
  mobile: Smartphone,
}

const categoryTitles = {
  blockchain: "Blockchain & Web3",
  frontend: "Frontend Development",
  backend: "Backend & Database",
  mobile: "Mobile Development",
}

export default function TechStack({ techStack }) {
  return (
    <div className="space-y-8">
      {Object.entries(techStack).map(([category, skills]) => {
        const IconComponent = categoryIcons[category]
        return (
          <div key={category} className="bg-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <IconComponent className="w-6 h-6 mr-2 text-blue-400" />
              {categoryTitles[category]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className={`text-sm font-semibold ${skill.color}`}>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}