export default interface Item {
    id: number;
    descripcion: string;
    costo: number;
    estadistica: number;
    categoria: string;
    jugador: {
      id: number;
      nombre: string;
      apellido: string;
      nacionalidad: string;
      Nro_Camiseta: number;
      posicion: string;
      foto: string;
      equipo: {
        id: number;
        ciudad: string;
        nombre: string;
        logo: string;
      };
    };
    cant_producto: number;
  }