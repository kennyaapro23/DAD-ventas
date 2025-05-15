// src/app/core/models/cliente.model.ts
export interface Cliente {
  id?: number;          // ≡ private Long id
  nombre: string;       // ≡ private String nombre
  email?: string;       // Campos opcionales
  telefono?: string;    // ≡ private String telefono (si existe)
  // Añade más campos según tu entidad
}
