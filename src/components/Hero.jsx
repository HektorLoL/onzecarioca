import React from 'react';
import { Waves, ArrowRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroProduct from './HeroProduct';
import camiseta1 from '../assets/tshirts/camiseta1.png';

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
      <HeroProduct image={camiseta1} />
    </div>
  </div>
);

export default Hero;
