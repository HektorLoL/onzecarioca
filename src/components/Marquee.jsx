import React from 'react';

const Marquee = () => (
  <div className="bg-green-900 py-4 overflow-hidden relative z-20">
    <div className="animate-marquee whitespace-nowrap flex gap-16 text-white/90 font-bold tracking-widest text-sm uppercase">
      <span>Futebol Arte</span> • <span>Raça & Paixão</span> • <span>Do Asfalto ao Gramado</span> • <span>Onze Carioca</span> • <span>Joga Bonito</span> • 
      <span>Futebol Arte</span> • <span>Raça & Paixão</span> • <span>Do Asfalto ao Gramado</span> • <span>Onze Carioca</span> • <span>Joga Bonito</span> •
      <span>Futebol Arte</span> • <span>Raça & Paixão</span> • <span>Do Asfalto ao Gramado</span> • <span>Onze Carioca</span> • <span>Joga Bonito</span>
    </div>
  </div>
);

export default Marquee;
