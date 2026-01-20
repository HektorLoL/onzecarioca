import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function Colecao({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    // Filter by Category
    if (selectedCategory !== 'Todos') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Price
    result = result.filter(p => p.price <= priceRange);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-black text-green-950 mb-4 tracking-tight">
            COLEÇÃO <span className="text-green-600">2026</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            Explore nossa linha completa de mantos sagrados. Do streetwear à performance, 
            encontre a peça que representa sua paixão.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Categorias
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      selectedCategory === category 
                        ? 'bg-green-700 text-white shadow-md shadow-green-900/20' 
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Preço Máximo
              </h3>
              <div className="px-2">
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-green-700"
                />
                <div className="flex justify-between mt-2 text-xs font-bold text-stone-500">
                  <span>R$ 0</span>
                  <span className="text-green-700 text-sm">R$ {priceRange}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
             <button 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-stone-200 rounded-xl font-bold text-stone-800 shadow-sm"
             >
               <span className="flex items-center gap-2"><Filter className="w-4 h-4" /> Filtrar Produtos</span>
               <ChevronDown className={`w-5 h-5 transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} />
             </button>
             
             {isMobileFilterOpen && (
               <div className="mt-4 p-4 bg-white rounded-xl border border-stone-200 shadow-lg space-y-6">
                 <div>
                    <h4 className="font-bold text-sm mb-3 text-stone-500">CATEGORIAS</h4>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                            selectedCategory === category 
                              ? 'bg-green-700 text-white border-green-700' 
                              : 'bg-white text-stone-600 border-stone-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                 </div>
                 <div>
                    <h4 className="font-bold text-sm mb-3 text-stone-500">PREÇO MÁXIMO: R$ {priceRange}</h4>
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      value={priceRange} 
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none accent-green-700"
                    />
                 </div>
               </div>
             )}
          </div>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-500 font-medium text-sm">
                Mostrando <strong className="text-stone-900">{filteredProducts.length}</strong> produtos
              </span>
              
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-sm font-bold text-stone-500">Ordenar por:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-stone-200 text-stone-700 text-sm font-bold rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 outline-none cursor-pointer hover:border-green-500 transition-colors"
                >
                  <option value="featured">Destaques</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name-asc">Nome (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAdd={addToCart} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                  <Filter className="w-8 h-8 text-stone-400" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">Nenhum produto encontrado</h3>
                <p className="text-stone-500">Tente ajustar seus filtros para encontrar o que procura.</p>
                <button 
                  onClick={() => {setSelectedCategory('Todos'); setPriceRange(500);}}
                  className="mt-6 text-green-700 font-bold hover:underline"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}