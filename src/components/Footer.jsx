import React from 'react';
import { Instagram, Twitter, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const footerLinks = [
  { name: 'Início', path: '/' },
  { name: 'Drops', path: '/drops' },
  { name: 'Conceito', path: '/conceito' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Contato', path: '/contato' },
];

const Footer = () => (
  <footer className="bg-white pt-20 pb-10 border-t border-stone-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2 mb-6">
            <img src={logo} alt="Onze Carioca" className="w-10 h-10 rounded-full object-cover border-2 border-green-700" />
            <span className="text-xl font-black text-green-900 tracking-tight">ONZE CARIOCA</span>
          </div>
          <p className="text-stone-500 max-w-sm mb-8 leading-relaxed text-sm">
            Nascida no calor do Rio de Janeiro. 
            Elevando o padrão do vestuário esportivo com design minimalista e qualidade técnica.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-green-700 hover:text-white transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-green-700 hover:text-white transition-all">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="md:col-span-2 md:col-start-7">
          <h4 className="text-green-900 font-black uppercase tracking-widest text-xs mb-6">Marca</h4>
          <ul className="space-y-3">
            {footerLinks.map(item => (
              <li key={item.name}>
                <Link to={item.path} className="text-stone-500 hover:text-green-700 transition-colors text-sm font-medium">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
           <h4 className="text-green-900 font-black uppercase tracking-widest text-xs mb-6">Newsletter</h4>
           <div className="flex gap-2">
             <input 
              type="text" 
              placeholder="seu@email.com" 
              className="bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-800 text-sm focus:outline-none focus:border-green-700 w-full transition-colors"
             />
             <button className="bg-green-700 p-3 rounded-lg text-white hover:bg-green-800 transition-colors shadow-md">
               <ChevronRight className="w-4 h-4" />
             </button>
           </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center text-stone-400 text-xs font-medium">
        <p>&copy; 2026 Onze Carioca. Todos os direitos reservados.</p>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <MapPin className="w-3 h-3 text-green-700" />
          <span>Rio de Janeiro, RJ</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
