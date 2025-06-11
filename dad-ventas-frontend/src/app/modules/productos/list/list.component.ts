import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../core/models/producto.model';
import { ProductService } from '../../../core/services/product.service';
import {CartService} from "../../../core/services/cart.service";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Output() onAddToCart = new EventEmitter<{ id: number; name: string; price: number }>();

  products: Product[] = [];
  paginatedProducts: Product[] = [];
  cart: number[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  isLoading = false;
  errorMessage: string | null = null;

  constructor(private productService: ProductService,
              private cartService: CartService
  ) {}


  ngOnInit(): void {
    this.loadProducts();
  }


  addProductToCart(product: Product): void {
    this.cartService.addItem({
      id: product.id!,
      name: product.name,
      price: product.price
    });
  }


  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updatePaginatedProducts();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar productos:', err);
        this.errorMessage = 'Error cargando productos';
        this.isLoading = false;
      }
    });
  }


  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  deleteProduct(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('✅ Producto eliminado correctamente');
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          this.errorMessage = 'Error al eliminar producto';
        }
      });
    }
  }
}
