import React from 'react';

const Marquee = () => {
  const items = ["Futebol Arte", "Raça & Paixão", "Do Asfalto ao Gramado", "Onze Carioca", "Joga Bonito"];
  
  // Duplicate the list to ensure there's enough content to fill the screen twice
  // This helps creating the seamless loop effect
  const doubledItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-green-900 py-3 md:py-4 overflow-hidden relative z-20 border-y border-green-800/30">
      <div className="flex w-max animate-marquee">
        <div className="flex gap-12 md:gap-16 px-6 md:px-8 text-white/90 font-bold tracking-widest text-xs md:text-sm uppercase whitespace-nowrap">
          {doubledItems.map((item, index) => (
            <React.Fragment key={index}>
              <span>{item}</span>
              <span className="text-yellow-500/50">•</span>
            </React.Fragment>
          ))}
        </div>
        {/* Mirror the first block exactly to create the seamless handoff */}
        <div className="flex gap-12 md:gap-16 px-6 md:px-8 text-white/90 font-bold tracking-widest text-xs md:text-sm uppercase whitespace-nowrap">
          {doubledItems.map((item, index) => (
            <React.Fragment key={index}>
              <span>{item}</span>
              <span className="text-yellow-500/50">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;