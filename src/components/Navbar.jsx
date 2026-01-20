import React from 'react';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const navItems = [
  { name: 'Lançamentos', path: '/lancamentos' },
  { name: 'Brasileirão', path: '/brasileirao' },
  { name: 'Seleções', path: '/selecoes' },
  { name: 'Resenha', path: '/resenha' },
];

const Navbar = ({ cartCount, onOpenCart }) => (
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
        <div className="flex items-center gap-4">
          <button className="p-2 text-stone-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-all">
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-all shadow-md hover:shadow-lg group"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">SACOLA</span>
            {cartCount > 0 && (
              <span className="ml-1 bg-white text-green-700 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 text-stone-600 hover:text-green-700">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
