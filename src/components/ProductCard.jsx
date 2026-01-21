import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAdd }) => (
  <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-green-200 transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50 flex flex-col h-full relative">
    <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-white/90 backdrop-blur text-green-900 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded-full shadow-sm">
            {product.tag}
        </span>
      </div>
      
      <Link to={`/product/${product.id}`} className="block w-full h-full">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:scale-105 transition-transform duration-700"
        />
      </Link>
      
      {/* Quick Add Button - Clean */}
      <button 
        onClick={() => onAdd(product)}
        className="absolute bottom-4 right-4 w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg md:translate-y-20 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-green-800 hover:scale-110 z-20"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="mb-2">
        <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-green-900 font-bold text-lg leading-tight group-hover:text-green-700 transition-colors">{product.name}</h3>
        </Link>
      </div>
      <p className="text-stone-500 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
      <div className="flex justify-between items-center pt-4 border-t border-stone-100 mt-auto">
        <span className="text-lg font-black text-green-900 font-sans">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-green-700"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-stone-300"></div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard;