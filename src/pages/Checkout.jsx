import React, { useState, useEffect } from 'react';
import { ShieldCheck, CreditCard, Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (cart.length === 0 && !success) {
      navigate('/');
    }
  }, [cart, navigate, success]);

  // Formatting Functions
  const formatCardNumber = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 16);
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.slice(i, i + 4));
    }
    return parts.join(' ');
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };

  const formatCVC = (value) => {
    return value.replace(/\D/g, '').slice(0, 3);
  };

  const formatCardName = (value) => {
    return value.toUpperCase();
  };

  // Validation Functions
  const validateField = (name, value) => {
    let error = "";
    
    if (!value.trim()) {
      return "Este campo é obrigatório";
    }

    switch (name) {
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) error = "Email inválido";
        break;
      case 'cardNumber':
        if (value.replace(/\s/g, '').length < 16) error = "Número do cartão incompleto";
        break;
      case 'expiry':
        if (value.length < 5) {
          error = "Data incompleta (MM/AA)";
        } else {
          const [month, year] = value.split('/');
          const currentYear = new Date().getFullYear() % 100;
          const currentMonth = new Date().getMonth() + 1;
          
          if (parseInt(month) < 1 || parseInt(month) > 12) error = "Mês inválido";
          else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            error = "Cartão expirado";
          }
        }
        break;
      case 'cvc':
        if (value.length < 3) error = "CVC incompleto";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Apply formatting based on field name
    if (name === 'cardNumber') formattedValue = formatCardNumber(value);
    else if (name === 'expiry') formattedValue = formatExpiry(value);
    else if (name === 'cvc') formattedValue = formatCVC(value);
    else if (name === 'cardName') formattedValue = formatCardName(value);

    setFormData({ ...formData, [name]: formattedValue });
    
    // Clear error when user types if field was touched
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, formattedValue)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!isValid) return;

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Houve um erro no processamento do pagamento.");
    } finally {
      setLoading(false);
    }
  };

  // Input helper to render form fields with error styles
  const renderInput = (label, name, placeholder, type = "text", autoComplete = "off", icon = null) => {
    const hasError = touched[name] && errors[name];
    
    return (
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-2">{label}</label>
        <div className="relative">
          {icon && (
             <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 pointer-events-none">
               {icon}
             </div>
          )}
          <input 
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete={autoComplete}
            className={`w-full ${icon ? 'pl-12' : 'px-4'} py-3 rounded-xl bg-white border transition-all shadow-sm outline-none
              ${hasError 
                ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                : 'border-stone-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10'
              }`}
            placeholder={placeholder}
          />
          {hasError && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 pointer-events-none">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}
        </div>
        {hasError && (
          <p className="text-red-500 text-xs font-bold mt-1.5 ml-1 animate-pulse">{errors[name]}</p>
        )}
      </div>
    );
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex items-center justify-center bg-stone-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-green-900 mb-4">Pagamento Confirmado!</h2>
          <p className="text-stone-600 mb-8">
            Obrigado por sua compra. Você receberá um email com os detalhes do seu pedido em breve.
          </p>
          <Link to="/" className="block w-full py-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-colors shadow-lg">
            VOLTAR PARA A LOJA
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-12 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-stone-500 hover:text-green-700 font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Voltar comprando
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Checkout Form */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-stone-100">
                <ShieldCheck className="w-6 h-6 text-green-700" />
                <h2 className="text-2xl font-black text-green-900">Finalizar Pagamento</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Personal Info */}
                <section>
                  <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">Dados Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      {renderInput("Nome Completo", "name", "João da Silva", "text", "name")}
                    </div>
                    <div className="col-span-2">
                      {renderInput("Email", "email", "joao@exemplo.com", "email", "email")}
                    </div>
                    <div className="col-span-2">
                      {renderInput("Endereço", "address", "Rua das Laranjeiras, 123", "text", "street-address")}
                    </div>
                    <div>
                      {renderInput("Cidade", "city", "Rio de Janeiro", "text", "address-level2")}
                    </div>
                    <div>
                       {renderInput("CEP", "zip", "22240-000", "text", "postal-code")}
                    </div>
                  </div>
                </section>

                {/* Payment Info */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest">Pagamento</h3>
                     <div className="flex items-center gap-2 text-green-700 text-xs font-bold bg-green-50 px-2 py-1 rounded">
                       <Lock className="w-3 h-3" /> Ambiente Seguro
                     </div>
                  </div>
                  
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="col-span-2">
                        {renderInput("Número do Cartão", "cardNumber", "0000 0000 0000 0000", "text", "cc-number", <CreditCard className="w-5 h-5" />)}
                      </div>
                      <div className="col-span-2">
                        {renderInput("Nome no Cartão", "cardName", "COMO NO CARTÃO", "text", "cc-name")}
                      </div>
                      <div>
                        {renderInput("Validade", "expiry", "MM/AA", "text", "cc-exp")}
                      </div>
                      <div>
                        {renderInput("CVC", "cvc", "123", "text", "cc-csc")}
                      </div>
                    </div>
                  </div>
                </section>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-5 bg-green-700 text-white font-black text-lg uppercase tracking-wider rounded-xl hover:bg-green-800 transition-all shadow-xl hover:shadow-green-900/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Pagar R$ {total.toFixed(2).replace('.', ',')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 sticky top-32">
              <h3 className="text-lg font-black text-green-900 mb-6">Resumo do Pedido</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-stone-200">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 text-sm">{item.name}</h4>
                      <p className="text-xs text-stone-500">Qtd: {item.quantity}</p>
                      <p className="text-sm font-bold text-green-700 mt-1">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-stone-100 pt-4 space-y-2">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                 <div className="flex justify-between text-stone-500">
                  <span>Frete</span>
                  <span className="text-green-600 font-bold">Grátis</span>
                </div>
                <div className="flex justify-between text-xl font-black text-green-900 pt-4">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;