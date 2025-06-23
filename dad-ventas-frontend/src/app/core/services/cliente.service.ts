import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { resources } from '../resources/resources';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    constructor(private http: HttpClient) {}

    // 🔹 GET /Client
    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(resources.clientes.listar);
    }

    // 🔹 GET /Client/{id}
    getClienteById(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(resources.clientes.detalle(id));
    }

    // 🔹 POST /Client
    createCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(resources.clientes.crear, cliente);
    }

    // 🔹 PUT /Client
    updateCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(resources.clientes.actualizar, cliente);
    }

    // 🔹 DELETE /Client/{id}
    deleteCliente(id: number): Observable<string> {
        return this.http.delete<string>(resources.clientes.eliminar(id));
    }

    // 🔹 GET /Client/search?name=...&document=...
    searchClientes(name?: string, document?: string): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(resources.clientes.buscar(name, document));
    }
}
