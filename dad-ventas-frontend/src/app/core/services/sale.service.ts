import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sale} from "../models/sale.model";
import {resources} from "../resources/resources";

@Injectable({
    providedIn: 'root',
})

export class SaleService {
    constructor(private http: HttpClient) {
    }

    // 🔹 Listar todas las ventas
    getSales(): Observable<Sale[]> {
        return this.http.get<Sale[]>(resources.ventas.listar);
    }

    // 🔹 Obtener una venta por ID
    getSaleById(id: number): Observable<Sale> {
        return this.http.get<Sale>(resources.ventas.detalle(id));
    }

    // 🔹 Procesar una venta a partir de un pedido
    processSale(orderId: number, paymentMethod: string): Observable<Sale> {
        return this.http.post<Sale>(
            resources.ventas.procesar(orderId, paymentMethod),
            {} // el backend no espera un body, pero Angular requiere algo para POST
        );
    }
}
