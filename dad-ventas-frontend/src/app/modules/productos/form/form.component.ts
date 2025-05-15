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
      name: ['', Validators.required],
      category: [null, Validators.required],
      code: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      this.productForm.patchValue(product);
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const product: Product = this.productForm.value;

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
  }
}
