import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/producto.model';
import { Category } from '../../../core/models/category.model';
import { CommonModule } from '@angular/common';

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
  selectedImageFile!: File;
  errorMessage: string | null = null;

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
      category: [null, Validators.required],
      code: ['', [Validators.required, Validators.maxLength(30)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''] // Se llenará al subir imagen
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (cats) => (this.categories = cats),
      error: () => (this.errorMessage = 'Error cargando categorías')
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      this.productForm.patchValue(product);
      this.imagePreview = product.imageUrl ?? null;
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const product: Product = this.productForm.value;

    const saveOrUpdate = () => {
      if (this.isEdit && this.productId != null) {
        product.id = this.productId;
        this.productService.updateProduct(product).subscribe(() => {
          this.router.navigate(['/productos']);
        });
      } else {
        this.productService.createProduct(product).subscribe(() => {
          this.router.navigate(['/productos']);
        });
      }
    };

    if (this.selectedImageFile) {
      this.productService.uploadImage(this.selectedImageFile).subscribe({
        next: (imageUrl: string) => {
          product.imageUrl = imageUrl;
          saveOrUpdate();
        },
        error: () => {
          this.errorMessage = 'Error al subir imagen';
        }
      });
    } else {
      saveOrUpdate();
    }
  }
}
