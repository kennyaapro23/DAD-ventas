import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Sale } from "../models/sale.model";
import { resources } from "../resources/resources";

@Injectable({
    providedIn: 'root',
})
export class SaleService {

    constructor(private http: HttpClient) {}

    // Ventas del Admin
    getSales(): Observable<Sale[]> {
        return this.http.get<Sale[]>(resources.ventas.listar);
    }

    // Compras del Cliente (con token se inyecta x-client-id desde el gateway)
    getMyPurchases(clientId: number): Observable<Sale[]> {
        const headers = new HttpHeaders().set('x-client-id', clientId.toString());
        return this.http.get<Sale[]>(resources.ventas.misCompras, { headers });
    }


    // 🔥 Procesar Venta
    processSale(orderId: number, metodo: string, tarjetaData?: any): Observable<any> {
        const url = resources.ventas.procesar(orderId, metodo);

        // Se prepara el cuerpo para el pago con tarjeta si es necesario
        let body = {};
        if (metodo === 'TARJETA' && tarjetaData) {
            body = {
                numero: tarjetaData.numero,
                fecha: tarjetaData.fecha,
                cvv: tarjetaData.cvv
            };
        }

        // Realizar la solicitud POST
        return this.http.post(url, body);
    }
}
