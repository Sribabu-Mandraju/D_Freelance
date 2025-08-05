"use client"

import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react'

export default function Education({ education }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <GraduationCap className="w-6 h-6 mr-2 text-blue-400" />
        Education
      </h2>
      
      <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{education.degree}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-400 mb-2">
              <span className="font-semibold text-blue-400">{education.institution}</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {education.location}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-2">
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              {education.duration}
            </div>
            <div className="bg-green-400/10 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
              CGPA: {education.cgpa}
            </div>
          </div>
        </div>

        {/* Relevant Coursework */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
            Relevant Coursework
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {education.coursework.map((course) => (
              <div key={course} className="bg-gray-600/50 text-gray-300 text-sm px-3 py-2 rounded-lg">
                {course}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}