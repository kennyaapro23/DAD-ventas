// src/app/core/models/venta.model.ts
import { Cliente } from './cliente.model';

export interface ItemVenta {
  productoId: number;   // Para relación con productos
  cantidad: number;     // Si tu Venta.java tiene items
}

export interface Venta {
  id?: number;          // ≡ private Long id
  cliente: Cliente;     // ≡ @ManyToOne private Cliente cliente
  fecha: string;        // Usamos string para Date (ISO format)
  total: number;        // ≡ private double total
  items?: ItemVenta[];  // Si manejas items en la venta
}
