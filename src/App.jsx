import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Menu, Search, Shirt, Star, Trophy, ArrowRight, Trash2, Plus, Minus, Instagram, Twitter, Facebook, Waves, Sun, Flame, MapPin, ChevronRight } from 'lucide-react';

// --- MOCK DATA ---
const PRODUCTS = [
  {
    id: 1,
    name: "Alvorada Retro 90",
    price: 349.90,
    category: "Retro",
    image: "https://placehold.co/600x600/f59e0b/ffffff?text=Alvorada+90",
    tag: "Clássico",
    description: "Inspirada nos pores do sol do Arpoador. Tecido respirável com gola polo clássica."
  },
  {
    id: 2,
    name: "Lapa Night Street",
    price: 289.90,
    category: "Streetwear",
    image: "https://placehold.co/600x600/1e3a8a/ffffff?text=Lapa+Blue",
    tag: "Novo",
    description: "Design sofisticado para a noite carioca. Azul profundo com acabamento premium."
  },
  {
    id: 3,
    name: "Maraca 50 Concept",
    price: 319.90,
    category: "Concept",
    image: "https://placehold.co/600x600/b91c1c/ffffff?text=Maraca+50",
    tag: "Exclusivo",
    description: "Homenagem ao templo do futebol. Vermelho intenso com detalhes em dourado real."
  },
  {
    id: 4,
    name: "Copacabana Wave",
    price: 299.90,
    category: "Lifestyle",
    image: "https://placehold.co/600x600/ffffff/000000?text=Copa+Wave",
    tag: "Trending",
    description: "Padrão icônico do calçadão aplicado em malha tecnológica off-white."
  },
  {
    id: 5,
    name: "Seleção Canarinho 82",
    price: 399.90,
    category: "Retro",
    image: "https://placehold.co/600x600/facc15/166534?text=Brasil+82",
    tag: "Lenda",
    description: "A camisa do futebol arte. O manto sagrado que encantou o mundo."
  },
  {
    id: 6,
    name: "Tijuca Forest",
    price: 279.90,
    category: "Concept",
    image: "https://placehold.co/600x600/064e3b/fbbf24?text=Tijuca+Forest",
    tag: "Eco",
    description: "Verde floresta profundo. Elegância sustentável com plásticos reciclados."
  }
];

const CATEGORIES = ["Todos", "Retro", "Streetwear", "Concept", "Lifestyle"];

// --- COMPONENTS ---

const Marquee = () => (
  <div className="bg-blue-900 py-4 overflow-hidden relative z-20">
    <div className="animate-marquee whitespace-nowrap flex gap-16 text-white/90 font-bold tracking-widest text-sm uppercase">
      <span>Futebol Arte</span> • <span>Raça & Paixão</span> • <span>Do Asfalto ao Gramado</span> • <span>Onze Carioca</span> • <span>Joga Bonito</span> • 
      <span>Futebol Arte</span> • <span>Raça & Paixão</span> • <span>Do Asfalto ao Gramado</span> • <span>Onze Carioca</span> • <span>Joga Bonito</span> •
      <span>Futebol Arte</span> • <span>Raça & Paixão</span> • <span>Do Asfalto ao Gramado</span> • <span>Onze Carioca</span> • <span>Joga Bonito</span>
    </div>
  </div>
);

const Navbar = ({ cartCount, onOpenCart }) => (
  <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-24">
        {/* Logo Section - Substitua a div abaixo pela sua imagem <img> */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center border-2 border-blue-900 group-hover:bg-white group-hover:text-blue-900 transition-colors duration-300">
             <span className="font-serif font-black text-white group-hover:text-blue-900 text-lg italic">11</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-blue-950 leading-none">
              ONZE
            </span>
            <span className="text-xs font-bold tracking-[0.3em] text-stone-500 uppercase">
              Carioca
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {['Lançamentos', 'Brasileirão', 'Seleções', 'Resenha'].map((item) => (
            <a key={item} href="#" className="relative text-sm font-bold text-stone-600 hover:text-blue-900 transition-colors uppercase tracking-wide group py-2">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-stone-600 hover:text-blue-900 hover:bg-stone-100 rounded-full transition-all">
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-all shadow-md hover:shadow-lg group"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">SACOLA</span>
            {cartCount > 0 && (
              <span className="ml-1 bg-white text-blue-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 text-stone-600 hover:text-blue-900">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <div className="relative pt-32 pb-12 md:pt-48 md:pb-32 overflow-hidden bg-stone-50">
    {/* Clean Background Pattern */}
    <div className="absolute inset-0 -z-20 opacity-[0.03]" 
         style={{ 
           backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
           backgroundSize: '40px 40px' 
         }}>
    </div>
    
    {/* Soft Blobs */}
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-200/40 blur-[120px] rounded-full -z-10 mix-blend-multiply" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-stone-200/50 blur-[100px] rounded-full -z-10" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
      <div className="w-full md:w-1/2 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 mb-8">
          <Waves className="w-3 h-3" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Verão Rio 2026</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-blue-950 leading-[0.9] tracking-tight mb-8">
          ALMA CARIOCA, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
            CORTE EUROPEU.
          </span>
        </h1>
        
        <p className="text-lg text-stone-600 max-w-lg mb-10 leading-relaxed font-medium">
          A intersecção entre a paixão das arquibancadas e a moda contemporânea. 
          Peças exclusivas para quem joga bonito em qualquer lugar.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
            VER COLEÇÃO <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-8 py-4 bg-white border border-stone-200 text-stone-800 font-bold rounded-xl hover:border-blue-900 hover:text-blue-900 transition-all flex items-center justify-center gap-2 shadow-sm">
            <Trophy className="w-4 h-4" /> ICONS
          </button>
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
           
           <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-blue-950/80 to-transparent">
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
           <span className="text-2xl font-black text-blue-900">1950</span>
        </div>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product, onAdd }) => (
  <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50 flex flex-col h-full relative">
    <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-white/90 backdrop-blur text-blue-950 text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded-full shadow-sm">
            {product.tag}
        </span>
      </div>
      
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:scale-105 transition-transform duration-700"
      />
      
      {/* Quick Add Button - Clean */}
      <button 
        onClick={() => onAdd(product)}
        className="absolute bottom-4 right-4 w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-800 hover:scale-110"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="mb-2">
        <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="text-blue-950 font-bold text-lg leading-tight group-hover:text-blue-700 transition-colors">{product.name}</h3>
      </div>
      <p className="text-stone-500 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
      <div className="flex justify-between items-center pt-4 border-t border-stone-100 mt-auto">
        <span className="text-lg font-black text-blue-950 font-sans">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-900"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-stone-300"></div>
        </div>
      </div>
    </div>
  </div>
);

const CartSidebar = ({ isOpen, onClose, cart, onRemove, onUpdateQty }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white border-l border-stone-200 z-[60] transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="px-8 py-6 border-b border-stone-100 flex justify-between items-center bg-white">
            <h2 className="text-xl font-black text-blue-950 tracking-tight">
              SEU VESTIÁRIO <span className="text-blue-500 text-sm align-top">({cart.length})</span>
            </h2>
            <button onClick={onClose} className="p-2 text-stone-400 hover:text-red-500 transition-colors bg-stone-50 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-stone-50">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60">
                <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center text-stone-400">
                   <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-stone-800 font-bold text-lg mb-2">Sua sacola está vazia</h3>
                  <p className="text-stone-500 text-sm max-w-[200px] mx-auto">Explore nossa coleção e encontre seu novo manto.</p>
                </div>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 group bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
                  <div className="w-20 h-20 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-blue-950 font-bold text-sm leading-tight pr-4">{item.name}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-stone-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-stone-500 font-bold mt-1 uppercase tracking-wide">{item.category}</p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-1">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-blue-900 bg-white rounded shadow-sm">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-800 w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-blue-900 bg-white rounded shadow-sm">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-blue-950">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-8 bg-white border-t border-stone-100">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-stone-500 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between items-center text-blue-950 text-2xl font-black">
                  <span>TOTAL</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              <button className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-blue-900/30 flex items-center justify-center gap-3">
                Finalizar Compra <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Footer = () => (
  <footer className="bg-white pt-20 pb-10 border-t border-stone-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="font-serif font-black text-white italic">11</span>
            </div>
            <span className="text-xl font-black text-blue-950 tracking-tight">ONZE CARIOCA</span>
          </div>
          <p className="text-stone-500 max-w-sm mb-8 leading-relaxed text-sm">
            Nascida no calor do Rio de Janeiro. 
            Elevando o padrão do vestuário esportivo com design minimalista e qualidade técnica.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-blue-900 hover:text-white transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-blue-900 hover:text-white transition-all">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="md:col-span-2 md:col-start-7">
          <h4 className="text-blue-950 font-black uppercase tracking-widest text-xs mb-6">Marca</h4>
          <ul className="space-y-3">
            {['Início', 'Drops', 'Conceito', 'Sobre', 'Contato'].map(item => (
              <li key={item}>
                <a href="#" className="text-stone-500 hover:text-blue-900 transition-colors text-sm font-medium">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
           <h4 className="text-blue-950 font-black uppercase tracking-widest text-xs mb-6">Newsletter</h4>
           <div className="flex gap-2">
             <input 
              type="text" 
              placeholder="seu@email.com" 
              className="bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-800 text-sm focus:outline-none focus:border-blue-900 w-full transition-colors"
             />
             <button className="bg-blue-900 p-3 rounded-lg text-white hover:bg-blue-800 transition-colors shadow-md">
               <ChevronRight className="w-4 h-4" />
             </button>
           </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center text-stone-400 text-xs font-medium">
        <p>&copy; 2026 Onze Carioca. Todos os direitos reservados.</p>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <MapPin className="w-3 h-3 text-blue-900" />
          <span>Rio de Janeiro, RJ</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN APP ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const filteredProducts = activeCategory === "Todos" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-blue-200 selection:text-blue-950">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <Hero />
      <Marquee />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
               <span className="w-2 h-2 rounded-full bg-blue-600"></span>
               <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">Temporada 2026</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight">O VESTIÁRIO</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-blue-900 text-white border-blue-900 shadow-lg shadow-blue-900/20' 
                    : 'bg-white text-stone-500 border-stone-200 hover:border-blue-900 hover:text-blue-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={addToCart} 
            />
          ))}
        </div>
      </main>

      <Footer />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
      />
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}