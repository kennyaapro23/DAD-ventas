import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/pedido.service';
import { OrderRequest } from '../../models/order.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, FormsModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  userDropdownOpen = false;
  userName: string | null = null;
  cartOpen = false;

  selectedClientId: number | null = null;
  clientes: any[] = [];

  constructor(
      private authService: AuthService,
      private router: Router,
      public cartService: CartService,
      private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    if (this.isAdmin) this.loadClientes();
  }

  loadClientes(): void {
    this.orderService.getClientes().subscribe({
      next: (clientes) => this.clientes = clientes,
      error: (err) => {
        console.error('❌ No se pudieron cargar los clientes:', err);
        alert('Error al cargar clientes');
      }
    });
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  get cartItems() {
    return this.cartService.getItems();
  }

  get cartTotal(): number {
    return this.cartService.getTotal();
  }

  get cartTotalCount(): number {
    return this.cartService.getCount();
  }

  incrementItem(productId: number): void {
    this.cartService.incrementQuantity(productId);
  }

  decrementItem(productId: number): void {
    this.cartService.decrementQuantity(productId);
  }

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

    let clientId: number | null;

    if (this.isAdmin) {
      if (!this.selectedClientId) {
        alert('⚠️ Como administrador, debes seleccionar un cliente.');
        return;
      }
      clientId = this.selectedClientId;
    } else {
      clientId = this.authService.getClientId();
      if (!clientId) {
        alert('⚠️ No se encontró el ID del cliente.');
        return;
      }
    }

    // ⚠️ Corregimos: quantity → amount
    const order: OrderRequest = {
      clientId,
      orderDetails: cartItems.map(item => ({
        productId: item.id,
        amount: item.quantity // 👈 importante usar 'amount'
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
