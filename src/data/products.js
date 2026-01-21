import productsData from './products.json';

export const PRODUCTS = productsData;

// Dynamically generate categories from the products list
// "Todos" is always the first category
export const CATEGORIES = ["Todos", ...new Set(productsData.map(p => p.category))];