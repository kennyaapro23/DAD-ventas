export interface Category {
  id: number;
  name: string;
  // Otras propiedades si existen
}

export interface Product {  // Cambiado de 'Producto' a 'Product' para coincidir con Java
  id: number;
  name: string;           // Antes 'nombre'
  description: string;
  code: string;
  stock: number;
  price: number;          // Antes 'precio'
  category: Category;
}
