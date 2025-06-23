// src/app/core/models/sale.model.ts
import { OrderResponse } from './order.model';

export interface Sale {
    id: number;
    orderId: number;
    totalAmount: number;
    status: string;
    paymentMethod: string;
    saleDate: string;
    orderDto?: OrderResponse;
}