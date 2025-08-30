"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ImageShowcase = ({ images = [] }) => {
  // Normalize sources: support ["url", ...] or [{ url }, ...]
  const sources = useMemo(
    () =>
      Array.isArray(images)
        ? images.map((img) => (typeof img === "string" ? img : img?.url || "/placeholder.svg"))
        : [],
    [images],
  )

  const [current, setCurrent] = useState(0)
  const count = sources.length

  const hasImages = count > 0
  const canSlide = count > 1

  const handlePrevImage = () => {
    if (!canSlide) return
    setCurrent((i) => (i - 1 + count) % count)
  }

  const handleNextImage = () => {
    if (!canSlide) return
    setCurrent((i) => (i + 1) % count)
  }

  if (!hasImages) {
    return (
      <div className="mb-8">
        <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl overflow-hidden mb-6 h-[450px] grid place-items-center">
          <span className="text-gray-400 text-sm">No images available</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl overflow-hidden mb-6 md:h-[450px]">
        <img
          src={sources[current] || "/placeholder.svg"}
          alt="Service showcase"
          className="w-full h-full md:object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {canSlide && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/90 md:p-3 rounded-full hover:bg-gray-800 transition-all duration-300 border border-gray-700/50"
              aria-label="Previous image"
            >
              <ChevronLeft className="md:w-6 md:h-6 h-4 w-4 text-cyan-400" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/90 md:p-3 rounded-full hover:bg-gray-800 transition-all duration-300 border border-gray-700/50"
              aria-label="Next image"
            >
              <ChevronRight className="md:w-6 md:h-6 h-4 w-4 text-cyan-400" />
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {sources.map((src, i) => {
          const isActive = i === current
          return (
            <img
              key={`${src}-${i}`}
              src={src || "/placeholder.svg"}
              alt={`Portfolio ${i + 1}`}
              className={`w-full h-24 md:object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                isActive
                  ? "border-2 border-cyan-400 shadow-lg shadow-cyan-400/25"
                  : "border border-gray-700/50 hover:border-cyan-400/50 hover:-translate-y-1"
              }`}
              onClick={() => setCurrent(i)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ImageShowcase
