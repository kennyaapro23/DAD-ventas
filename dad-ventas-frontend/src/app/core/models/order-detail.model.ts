import { Product } from './producto.model';

export interface OrderDetailRequest {
    productId: number;
    amount: number; // ✅ cantidad solicitada del producto
}


export interface OrderDetailResponse {
    id: number;               // ID del detalle del pedido (generado por backend)
    productId: number;
    price: number;            // Precio unitario del producto
    amount: number;           // Cantidad comprada
    totalPrice: number;       // price * amount
    productDto: Product | null; // Info del producto (nombre, descripción, etc.)
}
