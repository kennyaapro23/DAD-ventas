import { Component, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  darkMode = false;
  userDropdownOpen = false;

  // Sidebar
  mobileNavOpen = false;

  // 🛒 Carrito
  cartOpen = false;
  cartItems: { id: number; name: string; price: number }[] = [];

  // 👉 Métodos del dropdown
  toggleDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  closeDropdown() {
    this.userDropdownOpen = false;
  }

  // 🛒 Carrito
  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  addToCart(product: { id: number; name: string; price: number }) {
    const existsIndex = this.cartItems.findIndex(i => i.id === product.id);
    if (existsIndex === -1) {
      this.cartItems.push({ ...product });
    }
    this.cartOpen = true;
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  checkout() {
    alert('¡Gracias por su compra! Total: $' + this.cartTotal.toFixed(2));
    this.cartItems = [];
    this.cartOpen = false;
  }

  // Getters del carrito
  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  get cartTotalCount(): number {
    return this.cartItems.length;
  }

  // 🔒 Cerrar el dropdown si se clickea fuera
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const insideDropdown = target.closest('.dropdown') || target.closest('.nav-item');
    if (!insideDropdown) {
      this.userDropdownOpen = false;
    }
  }
  // 🔐 Logout simulado
  logout(): void {
    alert('Sesión cerrada');
    // Aquí puedes integrar con AuthService si lo necesitas
  }
  sidebarItems = [
    { route: '/dashboard', label: 'Dashboard', icon: 'fa-solid fa-chart-line' },
    { route: '/productos', label: 'Productos', icon: 'fa-solid fa-boxes-stacked', badge: '+12' },
    { route: '/categorias', label: 'Categorías', icon: 'fa-solid fa-tags' },
    { route: '/usuarios', label: 'Usuarios', icon: 'fa-solid fa-user-group' },
    { route: '/clientes', label: 'Clientes', icon: 'fa-solid fa-key' },
    { route: '/pedidos', label: 'Pedidos', icon: 'fa-solid fa-bag-shopping' },
    { route: '/roles', label: 'Roles', icon: 'fa-solid fa-gear' }
  ];
}
