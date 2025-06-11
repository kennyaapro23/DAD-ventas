import { Injectable } from '@angular/core';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
    cartItems: CartItem[] = [];

    getItems(): CartItem[] {
        return this.cartItems;
    }

    addItem(product: { id: number; name: string; price: number }): void {
        const item = this.cartItems.find(p => p.id === product.id);
        if (item) {
            item.quantity += 1; // 🔼 Incrementa cantidad si ya existe
        } else {
            this.cartItems.push({ ...product, quantity: 1 }); // 🆕 Agrega nuevo producto con cantidad 1
        }
    }

    removeItem(productId: number): void {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
    }

    incrementQuantity(productId: number): void {
        const item = this.cartItems.find(p => p.id === productId);
        if (item) item.quantity += 1;
    }

    decrementQuantity(productId: number): void {
        const item = this.cartItems.find(p => p.id === productId);
        if (item) {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                this.removeItem(productId); // ❌ Elimina si llega a 0
            }
        }
    }

    clear(): void {
        this.cartItems = [];
    }

    getTotal(): number {
        return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }

    getCount(): number {
        return this.cartItems.reduce((acc, item) => acc + item.quantity, 0); // 🧠 Total de unidades, no solo productos únicos
    }
}
