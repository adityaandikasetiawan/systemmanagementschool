import React from 'react';

interface UnitCardCircularProps {
  name: string;
  icon: string;
  color: string;
  onClick: () => void;
}

export const UnitCardCircular: React.FC<UnitCardCircularProps> = ({
  name,
  icon,
  color,
  onClick
}) => {
  return (
    <div className="flex flex-col items-center gap-4 group">
      {/* Circular Icon */}
      <div 
        className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer transform"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
        onClick={onClick}
      >
        {typeof icon === 'string' && (icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('/')) ? (
          <img src={icon} alt={name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full" />
        ) : (
          <span className="text-4xl md:text-5xl">{icon}</span>
        )}
      </div>
      
      {/* Name */}
      <div className="text-center">
        <h3 className="text-white mb-3 text-base md:text-lg">{name}</h3>
        <button
          onClick={onClick}
          className="px-6 py-2 rounded-full border-2 border-white text-white text-sm hover:bg-white hover:text-[#5B4DB5] transition-all duration-300 hover:scale-105"
        >
          Selengkapnya
        </button>
      </div>
    </div>
  );
};
