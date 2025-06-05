export interface OrderDetail {
    productId: number;
    quantity: number;
}

export interface OrderRequest {
    clientId: number;
    orderDetails: OrderDetail[];
}
