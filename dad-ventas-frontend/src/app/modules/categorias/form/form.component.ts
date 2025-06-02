import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../../core/models/category.model';

@Component({
  standalone: true,
  selector: 'app-category-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  categoryId: number | null = null;
  loading = false;
  errorMessage: string | null = null;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private categoryService: CategoryService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
    });

    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.categoryId;

    if (this.isEditMode) {
      this.loadCategory(this.categoryId!);
    }
  }

  loadCategory(id: number): void {
    this.loading = true;
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.form.patchValue(category);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando la categoría', err);
        this.errorMessage = 'No se pudo cargar la categoría';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const category: Category = this.form.value;
    this.loading = true;

    const request$ = this.isEditMode
        ? this.categoryService.updateCategory({ ...category, id: this.categoryId! })
        : this.categoryService.createCategory(category);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/categorias']);
      },
      error: (err) => {
        console.error('Error guardando la categoría', err);
        this.errorMessage = 'Error guardando la categoría';
        this.loading = false;
      }
    });
  }
}
