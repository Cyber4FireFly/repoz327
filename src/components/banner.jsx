import React from 'react';

const Banner = ({ title, image, className = "" }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      
        <div className="relative">
          <img 
            src={'/src/assets/img/BackBanner.png'} 
            alt={title} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-black">
              <h1 className="text-4xl font-rubik-bold mb-4">{title}</h1>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default Banner;
