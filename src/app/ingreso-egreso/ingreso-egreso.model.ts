export class IngresoEgreso {
  description: string;
  monto: number;
  tipo: string;

  constructor(obj: any) {
    this.description = (obj && obj.description) || null;
    this.monto = (obj && obj.monto) || null;
    this.tipo = (obj && obj.tipo) || null;
  }
}
