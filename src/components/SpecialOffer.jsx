import React from 'react';

const SpecialOffer = ({ offer }) => {
  const { title, description, image, buttonText, backgroundColor, textColor } = offer;

  return (
    <div className={`${backgroundColor} rounded-lg p-6 h-full flex flex-row justify-between`}>
      <div className="flex flex-col justify-between w-[262px]">
        <h3 className={`text-[24px] font-rubik-bold ${textColor} mb-4`}>
          {title}
        </h3>
        <p className={`${textColor} text-[16px] mb-6`}>
          {description}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="rounded-lg flex items-center justify-center">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
