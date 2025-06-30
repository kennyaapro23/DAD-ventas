import { Component, OnInit } from '@angular/core';
import { Sale } from '../../../core/models/sale.model';
import { SaleService } from '../../../core/services/sale.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ventas: Sale[] = [];
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
      private saleService: SaleService,
      public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.listarVentas();
    } else {
      this.listarMisCompras();
    }
  }

  /**
   * 🔐 Lista todas las ventas (solo para Administrador)
   */
  listarVentas(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.saleService.getSales().subscribe({
      next: (data) => {
        this.ventas = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error al listar ventas:', err);
        this.errorMessage = 'Error al cargar las ventas.';
        this.isLoading = false;
      }
    });
  }

  /**
   * 🛒 Lista las compras del cliente autenticado
   */
  listarMisCompras(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.saleService.getMyPurchases().subscribe({
      next: (data) => {
        this.ventas = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error al listar tus compras:', err);
        this.errorMessage = 'Error al cargar tus compras.';
        this.isLoading = false;
      }
    });
  }
}
