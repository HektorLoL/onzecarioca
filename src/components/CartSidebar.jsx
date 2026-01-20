import React from 'react';
import { ShoppingBag, X, Trash2, Minus, Plus, ArrowRight } from 'lucide-react';

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
            <h2 className="text-xl font-black text-green-900 tracking-tight">
              SEU VESTIÁRIO <span className="text-green-500 text-sm align-top">({cart.length})</span>
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
                        <h3 className="text-green-900 font-bold text-sm leading-tight pr-4">{item.name}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-stone-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-stone-500 font-bold mt-1 uppercase tracking-wide">{item.category}</p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-1">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-green-700 bg-white rounded shadow-sm">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-800 w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-green-700 bg-white rounded shadow-sm">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-green-900">
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
                <div className="flex justify-between items-center text-green-900 text-2xl font-black">
                  <span>TOTAL</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              <button className="w-full py-4 bg-green-700 hover:bg-green-800 text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-green-900/30 flex items-center justify-center gap-3">
                Finalizar Compra <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;