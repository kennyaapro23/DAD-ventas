import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Cliente} from "../models/cliente.model";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private apiUrl = 'http://localhost:8085/Client';
    constructor(private http: HttpClient) {}

    getCliente(){
        return this.http.get<Cliente[]>(this.apiUrl);
    }
    getClientById(id: number){
        return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
    }
    createCliente(cliente: Cliente){
        return this.http.post<Cliente>(this.apiUrl, cliente);
    }
    updateCliente(cliente: Cliente){
        return this.http.put<Cliente>(this.apiUrl, cliente);
    }
    deleteCliente(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`, {
            responseType: 'text' as 'json'
        });
    }

}