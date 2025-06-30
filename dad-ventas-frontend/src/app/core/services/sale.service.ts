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

    processSale(orderId: number, metodo: string, tarjetaData?: any): Observable<any> {
        const url = resources.ventas.procesar(orderId, metodo);

        let body = {};
        if (metodo === 'TARJETA' && tarjetaData) {
            body = {
                numero: tarjetaData.numero,
                fecha: tarjetaData.fecha,
                cvv: tarjetaData.cvv
            };
        }

        return this.http.post(url, body);
    }

}
