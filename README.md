# Onze Carioca

This is a web project built with Vite, React, and Tailwind CSS.

## How to Add Products and Collections

1.  **Add Images**: Place your product images in the `public/tshirts` folder (e.g., `public/tshirts/novacamisa.png`).
2.  **Update Data**: Open `src/data/products.json`.
3.  **Add Entry**: Add a new object to the list.
    ```json
    {
      "id": 7,
      "name": "Nova Camisa",
      "price": 199.90,
      "category": "NovaColecao",
      "image": "/tshirts/novacamisa.png",
      "tag": "Destaque",
      "description": "Descrição do produto."
    }
    ```
4.  **Collections**: A new "Collection" (Category) is automatically created when you add a product with a new `category` name (e.g., "NovaColecao").
