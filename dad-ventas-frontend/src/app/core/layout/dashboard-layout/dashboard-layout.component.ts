import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart.service';
import {OrderService} from "../../services/pedido.service";
import {OrderRequest} from "../../models/pedido.model";
import {AuthService} from "../../services/auth.service"; // Asegúrate de importar el servicio

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  userDropdownOpen = false;
  userName: string | null = null;
  cartOpen = false;

  constructor(
      private authService: AuthService,
      private router: Router,
      public cartService: CartService,
      private orderService: OrderService,

  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  // Getters desde el CartService
  get cartItems() {
    return this.cartService.getItems();
  }

  get cartTotal(): number {
    return this.cartService.getTotal();
  }

  get cartTotalCount(): number {
    return this.cartService.getCount();
  }

  // ✅ NUEVO: Aumentar cantidad
  incrementItem(productId: number): void {
    this.cartService.incrementQuantity(productId);
  }

  // ✅ NUEVO: Disminuir cantidad (y eliminar si llega a 0)
  decrementItem(productId: number): void {
    this.cartService.decrementQuantity(productId);
  }

  // ✅ Actualizado para trabajar por ID en lugar de index
  removeFromCart(index: number): void {
    const productId = this.cartItems[index]?.id;
    if (productId != null) {
      this.cartService.removeItem(productId);
    }
  }

  checkout(): void {
    const cartItems = this.cartService.getItems();

    if (cartItems.length === 0) {
      alert('🛒 Tu carrito está vacío.');
      return;
    }

    const clientId = this.authService.getUserId(); // 👈 Este método lo explico abajo
    if (!clientId) {
      alert('⚠️ No se encontró el ID del cliente.');
      return;
    }

    const order: OrderRequest = {
      clientId,
      orderDetails: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        alert('✅ Pedido enviado con éxito');
        this.cartService.clear();
        this.cartOpen = false;
      },
      error: (err) => {
        console.error('❌ Error al enviar el pedido:', err);
        alert('Error al enviar el pedido');
      }
    });
  }

  // Cerrar dropdown al hacer click fuera
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const insideDropdown = target.closest('.dropdown') || target.closest('.nav-item');
    if (!insideDropdown) {
      this.userDropdownOpen = false;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    alert('Sesión cerrada');
  }

  sidebarItems = [
    { route: '/dashboard', label: 'Dashboard', icon: 'fa-solid fa-chart-line' },
    { route: '/productos', label: 'Productos', icon: 'fa-solid fa-boxes-stacked', badge: '+12' },
    { route: '/categorias', label: 'Categorías', icon: 'fa-solid fa-tags' },
    { route: '/clientes', label: 'Clientes', icon: 'fa-solid fa-key' },
    { route: '/usuarios', label: 'Usuarios', icon: 'fa-solid fa-user-group' },
    { route: '/pedidos', label: 'Pedidos', icon: 'fa-solid fa-bag-shopping' },
    { route: '/roles', label: 'Roles', icon: 'fa-solid fa-gear' }
  ];
}
