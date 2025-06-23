import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderService } from '../../../core/services/pedido.service';
import { AuthService } from '../../../core/services/auth.service';
import { SaleService } from '../../../core/services/sale.service';
import { OrderResponse } from '../../../core/models/order.model';
import { Sale } from '../../../core/models/sale.model';

@Component({
  standalone: true,
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, DatePipe]
})
export class ListComponent implements OnInit {

  pedidos: OrderResponse[] = [];
  errorMessage: string | null = null;

  // Estado para procesar venta
  mostrarModal: boolean = false;
  pedidoSeleccionado: number | null = null;
  metodoSeleccionado: string | null = null;
  metodosPago: string[] = ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA'];

  constructor(
      private pedidoService: OrderService,
      private authService: AuthService,
      private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  // 🔹 Obtener pedidos del usuario
  private cargarPedidos(): void {
    this.pedidoService.getMyOrders().subscribe({
      next: (data) => {
        this.pedidos = data;
        if (data.length === 0) {
          this.errorMessage = '❌ No hay pedidos disponibles.';
        }
      },
      error: (err) => {
        console.error('❌ Error al obtener pedidos:', err);
        this.errorMessage = '❌ Error al cargar los pedidos.';
      }
    });
  }

  // 🔹 Mostrar opciones de pago para un pedido
  mostrarOpcionesPago(pedidoId: number): void {
    this.pedidoSeleccionado = pedidoId;
    this.metodoSeleccionado = null;
  }


  // 🔹 Procesar venta con método elegido
  seleccionarMetodo(metodo: string, pedidoId: number): void {
    this.metodoSeleccionado = metodo;

    this.saleService.processSale(pedidoId, metodo).subscribe({
      next: (venta: Sale) => {
        alert(`✅ Venta procesada con éxito\n🧾 Total: $${venta.totalAmount}\n📦 Pedido: #${venta.orderId}`);
        this.resetEstado();
      },
      error: (err) => {
        console.error('❌ Error al procesar venta:', err);
        alert('❌ No se pudo procesar la venta.');
      }
    });
  }

  // 🔹 Simular "comprar de nuevo"
  comprarDeNuevo(pedido: OrderResponse): void {
    const detalles = pedido.orderDetails.map(d => ({
      productId: d.productId,
      amount: d.amount
    }));

    console.log('🛒 Preparando para re-comprar:', detalles);
    alert(`Se preparó el pedido #${pedido.id} para re-compra ✅`);
  }

  // 🔹 Limpiar selección
  private resetEstado(): void {
    this.pedidoSeleccionado = null;
    this.metodoSeleccionado = null;
  }
}
