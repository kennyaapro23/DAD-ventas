import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Category } from '../../../core/models/category.model';
import { CommonModule } from '@angular/common';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  productForm!: FormGroup;
  isEdit = false;
  productId?: number;
  categories: Category[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  selectedImageFile?: File;
  errorMessage: string | null = null;

  apiBaseUrl = environment.apiUrl; // Usamos el valor del environment

  constructor(
      private fb: FormBuilder,
      private productService: ProductService,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.productId = +id;
        this.loadProduct(this.productId);
      }
    });
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      categoryId: [null, Validators.required],
      code: ['', [Validators.required, Validators.maxLength(30)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (cats) => this.categories = cats,
      error: () => this.errorMessage = 'Error cargando categorías'
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          categoryId: product.category?.id ?? null,
          code: product.code,
          price: product.price,
          stock: product.stock
        });
        this.imagePreview = product.imageUrl ? this.getImageUrl(product.imageUrl) : null;
      },
      error: () => this.errorMessage = 'Error cargando el producto'
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const productData = this.productForm.value;

    if (this.isEdit && this.productId != null) {
      productData.id = this.productId;
      this.productService.updateProduct(productData, this.selectedImageFile).subscribe({
        next: () => {
          alert('✅ Producto actualizado correctamente');
          this.router.navigate(['/productos']);
        },
        error: () => this.errorMessage = 'Error actualizando el producto'
      });
    } else {
      this.productService.createProduct(productData, this.selectedImageFile).subscribe({
        next: () => {
          alert('✅ Producto creado correctamente');
          this.router.navigate(['/productos']);
        },
        error: () => this.errorMessage = 'Error creando el producto'
      });
    }
  }

  getImageUrl(imagePath: string | null): string {
    if (!imagePath) return 'assets/no-image.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `${this.apiBaseUrl}${imagePath}`;
  }
}
