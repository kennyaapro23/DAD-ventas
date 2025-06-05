import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OrderRequest} from "../models/pedido.model";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:8085/Order'; // Tu controlador espera en /Order

    constructor(private http: HttpClient) {}

    createOrder(order: OrderRequest): Observable<any> {
        return this.http.post<any>(this.apiUrl, order);
    }
}
