# Onze Carioca - Contexto do Projeto

Este é o arquivo de contexto para o agente Gemini, descrevendo a arquitetura, convenções e comandos do projeto **Onze Carioca**.

## 🚀 Visão Geral
**Onze Carioca** é uma plataforma de e-commerce de vestuário esportivo premium, focada na cultura do futebol carioca. O projeto é uma Single Page Application (SPA) moderna, construída com foco em performance e experiência do usuário mobile-first.

### Tecnologias Principais
- **Framework:** React 19 + Vite 7
- **Estilização:** Tailwind CSS v4 + PostCSS
- **Roteamento:** React Router DOM v7
- **Ícones:** Lucide React
- **Analytics/Backend:** Firebase SDK
- **Persistência:** LocalStorage (para o carrinho)

## 📂 Estrutura de Pastas
- `src/assets/`: Ativos estáticos como logos e imagens globais.
- `src/components/`: Componentes reutilizáveis (Navbar, Footer, ProductCard, CartSidebar, Marquee).
- `src/data/`: Gerenciamento de dados. Contém o `products.json` que funciona como o banco de dados principal.
- `src/pages/`: Componentes de página (Home, ProductDetail, Checkout, Coleção, etc.).
- `src/styles/`: Arquivos CSS e configurações de estilo.
- `public/tshirts/`: Repositório de imagens dos produtos.

## 🛠 Comandos de Desenvolvimento
- `npm run dev`: Inicia o servidor de desenvolvimento Vite.
- `npm run build`: Gera o build de produção otimizado na pasta `dist/`.
- `npm run preview`: Visualiza o build de produção localmente.

## 📝 Convenções de Desenvolvimento

### Gerenciamento de Produtos
Para adicionar ou modificar produtos:
1.  Edite `src/data/products.json`.
2.  Siga o esquema de objeto:
    ```json
    {
      "id": number,
      "name": "string",
      "price": number,
      "category": "string",
      "image": "/tshirts/nome_imagem.png",
      "tag": "string",
      "description": "string",
      "reviews": [ ... ]
    }
    ```
3.  Novas categorias são geradas automaticamente a partir do campo `category`.

### Responsividade
- Utilize as classes utilitárias do Tailwind (`sm:`, `md:`, `lg:`, `xl:`) para garantir que o layout funcione em dispositivos móveis.
- O componente `Navbar` possui um menu lateral (drawer) específico para mobile.
- O componente `ProductCard` exibe o botão de "Adicionar" permanentemente em dispositivos móveis.

### Componentização
- Prefira componentes funcionais e Hooks.
- Mantenha o estado global (como o carrinho) no `App.jsx` ou utilize context se a complexidade aumentar.

### Estilo Visual
- O design segue uma estética "Magazine Style" com tipografia forte (`font-black`), cores inspiradas na natureza e futebol (tons de verde e pedra), e sombras suaves.
- O componente `Marquee` deve manter um loop infinito e fluido.

---
*Este arquivo serve como guia de contexto para futuras interações com o agente Gemini.*
