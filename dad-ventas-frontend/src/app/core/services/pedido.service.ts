import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderRequest } from '../models/order.model';
import { resources } from '../resources/resources';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) {}

    // 🔹 POST /Order
    createOrder(order: OrderRequest): Observable<any> {
        return this.http.post<any>(resources.pedidos.crear, order);
    }

    // 🔹 GET /Order
    getAllOrders(): Observable<any[]> {
        return this.http.get<any[]>(resources.pedidos.listar);
    }

    // 🔹 GET /Order/{id}
    getOrderById(id: number): Observable<any> {
        return this.http.get<any>(resources.pedidos.detalle(id));
    }

    // 🔹 PUT /Order/{id}
    updateOrder(id: number, order: OrderRequest): Observable<any> {
        return this.http.put<any>(resources.pedidos.actualizar(id), order);
    }

    // 🔹 DELETE /Order/{id}
    deleteOrder(id: number): Observable<any[]> {
        return this.http.delete<any[]>(resources.pedidos.eliminar(id));
    }

    // 🔹 GET /Order/mine
    getMyOrders(): Observable<any[]> {
        return this.http.get<any[]>(resources.pedidos.misPedidos); // 🔥 sin headers personalizados
    }

    // 🔹 Opcional: obtener clientes si eres admin
    getClientes(): Observable<any[]> {
        return this.http.get<any[]>(resources.clientes.listar);
    }
}
