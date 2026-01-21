import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingBag, Truck, ShieldCheck, Share2, X, Star, Copy, ChevronLeft, ChevronRight
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const shareMenuRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const foundProduct = PRODUCTS.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/colecao');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  // Close share menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho.');
      return;
    }
    addToCart({ ...product, size: selectedSize });
  };

  const sizes = ['P', 'M', 'G', 'GG', 'XG'];

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id)
    .concat(PRODUCTS.filter(p => p.category !== product.category));

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
        const cardWidth = 320; // approximate card width
        const gap = 24; // gap-6 is 24px
        const scrollAmount = cardWidth + gap;
        
        if (direction === 'left') {
            if (container.scrollLeft <= 10) {
                 // Loop to end
                 container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        } else {
            // Check if at end (approximate)
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                 // Loop to start
                 container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                 container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    }
  };

  const reviews = product.reviews || [];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copiado para a área de transferência!");
    setShowShareMenu(false);
  };

  const shareText = `Confira ${product.name} na Onze Carioca!`;
  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-stone-500 hover:text-green-800 font-bold mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>

        {/* Product Main Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="bg-stone-100 relative aspect-square lg:aspect-auto">
               <div className="absolute top-6 left-6 z-10">
                  <span className="bg-white/90 backdrop-blur text-green-900 text-xs font-black px-4 py-2 uppercase tracking-widest rounded-full shadow-sm">
                      {product.tag}
                  </span>
               </div>
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="w-full h-full object-cover mix-blend-multiply"
               />
            </div>

            {/* Info Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center relative">
              <div className="mb-6">
                <p className="text-sm text-stone-500 font-bold uppercase tracking-widest mb-2">{product.category}</p>
                <h1 className="text-4xl lg:text-5xl font-black text-green-950 leading-tight mb-4">{product.name}</h1>
                <p className="text-2xl font-black text-green-700">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
              </div>

              <p className="text-stone-600 text-lg leading-relaxed mb-8 border-b border-stone-100 pb-8">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-stone-800">Tamanho</span>
                  <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs font-bold text-green-700 underline hover:text-green-900 transition-colors"
                  >
                    Guia de medidas
                  </button>
                </div>
                <div className="flex gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl font-bold flex items-center justify-center border-2 transition-all ${
                        selectedSize === size
                          ? 'border-green-700 bg-green-700 text-white'
                          : 'border-stone-200 text-stone-600 hover:border-green-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-20">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-700 text-white font-black uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-green-900/20 hover:bg-green-800 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-5 h-5" /> Adicionar ao Carrinho
                </button>
                
                {/* Share Button & Popup */}
                <div className="relative" ref={shareMenuRef}>
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-14 h-14 border-2 border-stone-200 rounded-xl flex items-center justify-center text-stone-400 hover:border-green-300 hover:text-green-700 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                  {showShareMenu && (
                    <div className="absolute bottom-full right-0 mb-2 w-56 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden z-50 animate-fade-in-up">
                      <div className="p-3 grid gap-2">
                         <button 
                           onClick={handleCopyLink}
                           className="flex items-center gap-3 w-full p-2 hover:bg-stone-50 rounded-lg transition-colors text-stone-600 font-medium text-sm text-left"
                         >
                           <Copy className="w-4 h-4" /> Copiar Link
                         </button>
                         <a 
                           href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-3 w-full p-2 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors text-stone-600 font-medium text-sm text-left"
                           onClick={() => setShowShareMenu(false)}
                         >
                            {/* WhatsApp Icon */}
                           <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold">W</div>
                           WhatsApp
                         </a>
                         <a 
                           href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-3 w-full p-2 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors text-stone-600 font-medium text-sm text-left"
                           onClick={() => setShowShareMenu(false)}
                         >
                           <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">X</div>
                           Twitter (X)
                         </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl">
                  <Truck className="w-6 h-6 text-green-700" />
                  <div>
                    <p className="font-bold text-stone-800 text-sm">Frete Grátis</p>
                    <p className="text-xs text-stone-500">Para todo o Brasil</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-green-700" />
                  <div>
                    <p className="font-bold text-stone-800 text-sm">Compra Segura</p>
                    <p className="text-xs text-stone-500">Garantia de 30 dias</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-black text-green-950 mb-8 flex items-center gap-3">
            Avaliações <span className="text-base font-normal text-stone-500">({reviews.length})</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-stone-900">{review.user}</p>
                    <p className="text-xs text-stone-400">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* "Outros também gostaram" Slider (Scrollable with Loop) */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-black text-green-950">Outros também gostaram</h2>
            <div className="flex gap-2">
                <button 
                    onClick={() => scroll('left')}
                    className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-green-700 hover:text-white hover:border-green-700 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => scroll('right')}
                    className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-green-700 hover:text-white hover:border-green-700 transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
          </div>
          
          <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
             <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x scroll-smooth"
             >
               {relatedProducts.map(p => (
                 <div key={p.id} className="min-w-[280px] sm:min-w-[320px] snap-center">
                   <ProductCard product={p} onAdd={addToCart} />
                 </div>
               ))}
             </div>
          </div>
        </div>

      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowSizeGuide(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-black text-green-950 mb-6 text-center">Guia de Medidas</h3>
            <p className="text-stone-500 text-center mb-8 text-sm">
              Use uma fita métrica para encontrar o tamanho ideal para você. As medidas podem variar até 2cm.
            </p>
            
            <div className="overflow-hidden rounded-xl border border-stone-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Tamanho</th>
                    <th className="px-6 py-4">Tórax</th>
                    <th className="px-6 py-4">Comprimento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr className="hover:bg-stone-50">
                    <td className="px-6 py-4 font-bold text-stone-800">P</td>
                    <td className="px-6 py-4 text-stone-600">96 cm</td>
                    <td className="px-6 py-4 text-stone-600">70 cm</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="px-6 py-4 font-bold text-stone-800">M</td>
                    <td className="px-6 py-4 text-stone-600">100 cm</td>
                    <td className="px-6 py-4 text-stone-600">72 cm</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="px-6 py-4 font-bold text-stone-800">G</td>
                    <td className="px-6 py-4 text-stone-600">104 cm</td>
                    <td className="px-6 py-4 text-stone-600">74 cm</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="px-6 py-4 font-bold text-stone-800">GG</td>
                    <td className="px-6 py-4 text-stone-600">108 cm</td>
                    <td className="px-6 py-4 text-stone-600">76 cm</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="px-6 py-4 font-bold text-stone-800">XG</td>
                    <td className="px-6 py-4 text-stone-600">112 cm</td>
                    <td className="px-6 py-4 text-stone-600">78 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-xl">
               <p className="text-xs text-green-800 text-center font-medium">
                 Dica: Se você prefere um caimento mais solto (oversized), escolha um tamanho maior que o habitual.
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
