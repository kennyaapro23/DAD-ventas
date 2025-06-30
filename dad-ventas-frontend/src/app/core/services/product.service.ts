import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/producto.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8085/Product';
  private categoriesApiUrl = 'http://localhost:8085/Category';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear producto con imagen opcional
   */
  createProduct(data: any, image?: File): Observable<Product> {
    const formData = this.buildFormData(data, image);
    return this.http.post<Product>(this.apiUrl, formData);
  }

  /**
   * Actualizar producto con imagen opcional
   */
  updateProduct(data: any, image?: File): Observable<Product> {
    const formData = this.buildFormData(data, image);
    formData.append('id', data.id.toString());
    return this.http.put<Product>(this.apiUrl, formData);
  }

  /**
   * Utilidad para armar el FormData
   */
  private buildFormData(data: any, image?: File): FormData {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('stock', data.stock.toString());
    formData.append('categoryId', data.categoryId.toString());

    if (image) {
      formData.append('image', image);
    }

    return formData;
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Listar categorías
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesApiUrl);
  }
}
