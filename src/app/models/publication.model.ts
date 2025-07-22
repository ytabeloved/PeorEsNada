export interface Publication {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen?: string; // en base64 o vacía
}
