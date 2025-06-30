// core/models/order.model.ts
import { OrderDetailRequest, OrderDetailResponse } from './order-detail.model';

export interface OrderRequest {
    clientId: number;
    orderDetails: OrderDetailRequest[];
}

export interface OrderResponse {
    id: number;
    number: string | null;
    totalAmount: number | null;
    clientId: number;

    clientDto: {
        id: number;
        name: string;
        document: string;
        email: string;
    } | null;

    orderDetails: OrderDetailResponse[];
    date?: string;
    status: string;
}
