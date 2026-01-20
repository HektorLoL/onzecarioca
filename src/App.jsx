import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Lancamentos from './pages/Lancamentos';
import Brasileirao from './pages/Brasileirao';
import Selecoes from './pages/Selecoes';
import Resenha from './pages/Resenha';
import Drops from './pages/Drops';
import Conceito from './pages/Conceito';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Icons from './pages/Icons';
import Colecao from './pages/Colecao';
import Checkout from './pages/Checkout';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyljiec_6KRT0USuVcpfYA5O1fNuiuBtU",
  authDomain: "onzecarioca-16dcf.firebaseapp.com",
  projectId: "onzecarioca-16dcf",
  storageBucket: "onzecarioca-16dcf.firebasestorage.app",
  messagingSenderId: "768349448989",
  appId: "1:768349448989:web:f09a5f6ad9de90c579cff4",
  measurementId: "G-CVF331JL11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-stone-50 font-sans selection:bg-blue-200 selection:text-blue-950 flex flex-col relative">
        <div className="fixed inset-0 pointer-events-none bg-football-pattern z-0"></div>
        <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
        
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/lancamentos" element={<Lancamentos />} />
          <Route path="/brasileirao" element={<Brasileirao />} />
          <Route path="/selecoes" element={<Selecoes />} />
          <Route path="/resenha" element={<Resenha />} />
          <Route path="/drops" element={<Drops />} />
          <Route path="/conceito" element={<Conceito />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/icons" element={<Icons />} />
          <Route path="/colecao" element={<Colecao addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
        </Routes>

        <Footer />
        
        <CartSidebar 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQty={updateQuantity}
        />
      </div>
    </Router>
  );
}