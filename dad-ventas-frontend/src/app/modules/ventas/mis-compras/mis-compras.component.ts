import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sale } from '../../../core/models/sale.model';
import { SaleService } from '../../../core/services/sale.service';

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.scss'
})
export class MisComprasComponent implements OnInit {

  compras: Sale[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    this.listarMisCompras();
  }

  listarMisCompras(): void {
    this.isLoading = true;
    this.errorMessage = null;

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
  }
}
