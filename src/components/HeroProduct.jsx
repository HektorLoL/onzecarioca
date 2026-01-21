import React from 'react';
import { Sun } from 'lucide-react';

const HeroProduct = ({ image, title = "GOLDEN ERA", subtitle = "Edição Limitada" }) => {
  return (
    <div className="w-full md:w-1/2 relative z-10">
        <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-stone-300 border border-white">
           <img 
            src={image} 
            alt="Hero Shirt" 
            className="w-full h-full object-cover"
           />
           
           <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-green-900/80 to-transparent">
             <div className="flex items-center gap-2 mb-2">
                <Sun className="w-5 h-5 text-yellow-400" />
                <span className="text-white/90 font-bold tracking-widest text-xs uppercase">{subtitle}</span>
             </div>
             <h2 className="text-3xl font-black text-white italic tracking-tighter">{title}</h2>
           </div>
        </div>
        
        {/* Floating Badge */}
        <div className="absolute top-8 right-4 md:-right-4 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex flex-col items-center justify-center z-30 shadow-xl border-4 border-stone-100">
           <span className="text-stone-400 text-[10px] font-bold uppercase">Est.</span>
           <span className="text-xl md:text-2xl font-black text-green-800">1950</span>
        </div>
    </div>
  );
};

export default HeroProduct;
