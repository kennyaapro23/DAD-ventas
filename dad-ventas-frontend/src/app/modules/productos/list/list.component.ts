import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../core/models/producto.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products: Product[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.errorMessage = 'Error loading products';
        this.isLoading = false;
      }
    });
  }

  deleteProduct(id: number): void {
  if (confirm('¿Seguro que deseas eliminar este producto?')) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        this.errorMessage = null;  // Limpiar mensajes de error previos
        alert('Eliminación exitosa'); // Mostrar alerta de éxito (puedes cambiar por otra forma de mostrar)
        this.loadProducts(); // Recargar lista
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.errorMessage = 'Error al eliminar el producto';
      }
    });
  }
}

}
