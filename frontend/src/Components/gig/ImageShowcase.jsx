import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageShowcase = () => {
  const [mainImage, setMainImage] = useState('/erc20-token-showcase.png');

  const images = [
    '/erc20-token-showcase.png',
    '/smart-contract-code-editor.png',
    '/blockchain-deployment-interface.png',
    '/token-analytics-dashboard.png'
  ];

  const handlePrevImage = () => {
    setMainImage((prev) => {
      const currentIndex = images.indexOf(prev);
      return images[(currentIndex - 1 + images.length) % images.length];
    });
  };

  const handleNextImage = () => {
    setMainImage((prev) => {
      const currentIndex = images.indexOf(prev);
      return images[(currentIndex + 1) % images.length];
    });
  };

  return (
    <div className="mb-8">
      <div className="relative bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden mb-6 shadow-2xl shadow-cyan-500/10" style={{ height: '450px' }}>
        <img
          src={mainImage || "/placeholder.svg"}
          alt="Service showcase"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-3 rounded-full hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/30"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-cyan-400" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-3 rounded-full hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/30"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-cyan-400" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img || "/placeholder.svg"}
            alt={`Portfolio ${index + 1}`}
            className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
              mainImage === img 
                ? 'border-2 border-cyan-500 shadow-lg shadow-cyan-500/25' 
                : 'border border-gray-700/30 hover:border-cyan-500/50 hover:-translate-y-1'
            }`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageShowcase;
