import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      document: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // ejemplo: 8 dígitos para DNI
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // 9 dígitos para Perú
      role: ['CLIENTE'] // rol fijo
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor completa correctamente todos los campos.';
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.errorMessage = '';

    const { userName, password, role, name, document, telefono } = this.registerForm.value;

    const payload = { userName, password, role, name, document, telefono };

    this.authService.create(payload).subscribe({
      next: (res) => {
        console.log('✅ Registro exitoso', res);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('❌ Error en registro', err);
        this.errorMessage = err?.error?.message || 'Error al registrarse. Intenta de nuevo.';
      }
    });
  }
}
