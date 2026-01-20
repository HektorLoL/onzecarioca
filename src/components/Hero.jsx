import React from 'react';
import { Waves, ArrowRight, Trophy, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <div className="relative pt-32 pb-12 md:pt-48 md:pb-32 overflow-hidden bg-transparent">
    
    {/* Soft Blobs */}
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-200/40 blur-[120px] rounded-full -z-10 mix-blend-multiply" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-stone-200/50 blur-[100px] rounded-full -z-10" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
      <div className="w-full md:w-1/2 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-800 border border-green-200 mb-8">
          <Waves className="w-3 h-3" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Verão Rio 2026</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-green-950 leading-[0.9] tracking-tight mb-8">
          ALMA CARIOCA, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500">
            CORTE EUROPEU.
          </span>
        </h1>
        
        <p className="text-lg text-stone-600 max-w-lg mb-10 leading-relaxed font-medium">
          A intersecção entre a paixão das arquibancadas e a moda contemporânea. 
          Peças exclusivas para quem joga bonito em qualquer lugar.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/colecao" className="px-8 py-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20">
            VER COLEÇÃO <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/icons" className="px-8 py-4 bg-white border border-stone-200 text-stone-800 font-bold rounded-xl hover:border-green-700 hover:text-green-700 transition-all flex items-center justify-center gap-2 shadow-sm">
            <Trophy className="w-4 h-4" /> ICONS
          </Link>
        </div>
      </div>
      
      {/* Hero Visual - Cleaner, Magazine Style */}
      <div className="w-full md:w-1/2 relative z-10">
        <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-stone-300 border border-white">
           <img 
            src="https://placehold.co/800x800/e5e5e5/1e3a8a?text=PREMIUM+KIT" 
            alt="Hero Shirt" 
            className="w-full h-full object-cover"
           />
           
           <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-green-900/80 to-transparent">
             <div className="flex items-center gap-2 mb-2">
                <Sun className="w-5 h-5 text-yellow-400" />
                <span className="text-white/90 font-bold tracking-widest text-xs uppercase">Edição Limitada</span>
             </div>
             <h2 className="text-3xl font-black text-white italic tracking-tighter">GOLDEN ERA</h2>
           </div>
        </div>
        
        {/* Floating Badge */}
        <div className="absolute top-8 -right-4 w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center z-30 shadow-xl border-4 border-stone-100">
           <span className="text-stone-400 text-[10px] font-bold uppercase">Est.</span>
           <span className="text-2xl font-black text-green-800">1950</span>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
