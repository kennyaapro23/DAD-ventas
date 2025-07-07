import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sale } from '../../../core/models/sale.model';
import { SaleService } from '../../../core/services/sale.service';
import { AuthService } from '../../../core/services/auth.service'; // Importamos AuthService

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.scss']
})
export class MisComprasComponent implements OnInit {

  compras: Sale[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
      private saleService: SaleService,
      private authService: AuthService  // Inyectamos AuthService
  ) {}

  ngOnInit(): void {
    this.listarMisCompras();
  }

  listarMisCompras(): void {
    this.isLoading = true;
    this.errorMessage = null;

    // Obtener el clientId desde AuthService
    const clientId = this.authService.getClientId();

    if (clientId) {
      // Pasa el clientId al servicio de ventas
      this.saleService.getMyPurchases().subscribe({
        next: (data) => {
          this.compras = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('❌ Error al listar compras:', err);
          this.errorMessage = 'Error al cargar tus compras.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'No se pudo obtener el clientId del token.';
      this.isLoading = false;
    }
  }
}
