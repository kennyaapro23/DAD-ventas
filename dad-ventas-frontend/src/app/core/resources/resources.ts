import { environment } from "../../environments/environment";

const API = environment.apiUrl;

export const resources = {
    auth: {
        login: `${API}/auth/login`,
        create: `${API}/auth/create`,
        validate: `${API}/auth/validate`,
        users: `${API}/auth/users`
    },

    pedidos: {
        listar: `${API}/Order`,                       // GET - todos los pedidos (Admin)
        detalle: (id: number) => `${API}/Order/${id}`,// GET - pedido por ID
        crear: `${API}/Order`,                        // POST - crear pedido
        actualizar: (id: number) => `${API}/Order/${id}`, // PUT - actualizar pedido
        eliminar: (id: number) => `${API}/Order/${id}`,   // DELETE - eliminar por ID
        misPedidos: `${API}/Order/mine`               // GET - pedidos solo del cliente
    },

    clientes: {
        listar: `${API}/Client`,                      // GET - listar todos
        crear: `${API}/Client`,                       // POST - crear
        actualizar: `${API}/Client`,                  // PUT - actualizar
        eliminar: (id: number) => `${API}/Client/${id}`, // DELETE - eliminar por ID
        detalle: (id: number) => `${API}/Client/${id}`,  // GET - detalle por ID
        buscar: (name?: string, document?: string) => {
            const params = new URLSearchParams();
            if (name) params.append('name', name);
            if (document) params.append('document', document);
            return `${API}/Client/search?${params.toString()}`;
        }
    },

    ventas: {
        listar: `${API}/Sale`,                        // GET - listar ventas (admin)
        misCompras: `${API}/Sale/my`,                 // GET - listar compras del cliente
        detalle: (id: number) => `${API}/Sale/${id}`, // GET - detalle venta
        procesar: (orderId: number, paymentMethod: string) =>
            `${API}/Sale/process/${orderId}?paymentMethod=${encodeURIComponent(paymentMethod)}`
    }
};
