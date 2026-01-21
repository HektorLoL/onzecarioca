import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const navItems = [
  { name: 'Lançamentos', path: '/lancamentos' },
  { name: 'Brasileirão', path: '/brasileirao' },
  { name: 'Seleções', path: '/selecoes' },
  { name: 'Resenha', path: '/resenha' },
];

const Navbar = ({ cartCount, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <img src={logo} alt="Onze Carioca" className="w-10 h-10 rounded-full object-cover border-2 border-green-700 group-hover:border-green-600 transition-colors duration-300" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-green-900 leading-none">
                ONZE
              </span>
              <span className="text-xs font-bold tracking-[0.3em] text-stone-500 uppercase">
                Carioca
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path} className="relative text-sm font-bold text-stone-600 hover:text-green-700 transition-colors uppercase tracking-wide group py-2">
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-stone-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-all">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-all shadow-md hover:shadow-lg group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold hidden sm:inline">SACOLA</span>
              {cartCount > 0 && (
                <span className="ml-1 bg-white text-green-700 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-stone-600 hover:text-green-700"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white z-[60] transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-2xl md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <img src={logo} alt="Onze Carioca" className="w-8 h-8 rounded-full border border-green-700" />
                <span className="font-black text-green-900 tracking-tight">MENU</span>
             </div>
             <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-stone-400 hover:text-red-500 bg-stone-50 rounded-full"
             >
               <X className="w-5 h-5" />
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="block text-xl font-black text-stone-800 hover:text-green-700 transition-colors py-4 border-b border-stone-50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="p-6 bg-stone-50 mt-auto">
             <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Siga-nos</p>
             <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-stone-200 text-stone-600 shadow-sm">
                   IG
                </a>
                <a href="#" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-stone-200 text-stone-600 shadow-sm">
                   TW
                </a>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;