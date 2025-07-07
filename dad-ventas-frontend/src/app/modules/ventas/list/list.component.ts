import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sale } from '../../../core/models/sale.model';
import { SaleService } from '../../../core/services/sale.service';
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ventas: Sale[] = [];  // Variable para almacenar las ventas del cliente o admin
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
      private saleService: SaleService,
      public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listarVentas();  // Método para listar las ventas (del cliente o del admin)
  }

  listarVentas(): void {
    this.isLoading = true;
    this.errorMessage = null;

    // Verifica si el usuario es admin
    if (this.authService.isAdmin()) {
      // Si es administrador, obtener todas las ventas
      this.saleService.getSales().subscribe({
        next: (data) => {
          this.ventas = data;  // Almacena las ventas en la variable 'ventas'
          this.isLoading = false;
        },
        error: (err) => {
          console.error('❌ Error al listar todas las ventas:', err);
          this.errorMessage = 'Error al cargar las ventas.';
          this.isLoading = false;
        }
      });
    } else {
      // Si es cliente, obtener solo sus compras
      const clientId = this.authService.getClientId();

      if (clientId) {
        this.saleService.getMyPurchases().subscribe({
          next: (data) => {
            this.ventas = data;  // Almacena las compras del cliente
            this.isLoading = false;
          },
          error: (err) => {
            console.error('❌ Error al listar compras del cliente:', err);
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
}
