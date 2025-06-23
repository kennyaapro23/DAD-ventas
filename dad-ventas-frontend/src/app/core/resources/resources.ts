import {environment} from "../../environments/environment";


const API = environment.apiUrl
export const resources = {
    auth: {
        login: `${API}/auth/login`,
        create: `${API}/auth/create`,
        validate: `${API}/auth/validate`,
        users: `${API}/auth/users`
    },
    pedidos:{
        listar: `${API}/Order`,                    // GET - todos los pedidos
        detalle: (id: number) => `${API}/Order/${id}`, // GET - pedido por ID
        crear: `${API}/Order`,                     // POST - crear pedido
        actualizar: (id: number) => `${API}/Order/${id}`, // PUT - actualizar pedido
        eliminar: (id: number) => `${API}/Order/${id}`,   // DELETE - eliminar pedido
        misPedidos: `${API}/Order/mine`
    },
    clientes: {
        listar: `${API}/Client`, // GET: listar todos los clientes
        crear: `${API}/Client`,  // POST: crear cliente
        actualizar: `${API}/Client`, // PUT: actualizar cliente
        eliminar: (id: number) => `${API}/Client/${id}`, // DELETE: eliminar por ID
        detalle: (id: number) => `${API}/Client/${id}`,  // GET: cliente por ID
        buscar: (name?: string, document?: string) => {
            const params = new URLSearchParams();
            if (name) params.append('name', name);
            if (document) params.append('document', document);
            return `${API}/Client/search?${params.toString()}`;
        }
    },
    ventas: {
        listar: `${API}/Sale`, // GET - lista todas las ventas
        detalle: (id: number) => `${API}/Sale/${id}`, // GET - una venta por ID
        procesar: (orderId: number, paymentMethod: string) =>
            `${API}/Sale/process/${orderId}?paymentMethod=${encodeURIComponent(paymentMethod)}` // POST - procesar venta desde pedido
    },
};
