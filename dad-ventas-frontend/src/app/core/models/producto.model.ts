import { Category } from './category.model';

export interface Product {
  id?: number;
  name: string;
  description: string;
  code: string;
  stock: number;
  price: number;
  imageUrl?: string;
  category: Category;

}
