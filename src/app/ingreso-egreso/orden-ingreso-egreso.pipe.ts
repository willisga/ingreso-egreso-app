import { Pipe, PipeTransform } from "@angular/core";
import { IngresoEgreso } from "./ingreso-egreso.model";

@Pipe({
  name: "ordenIngresoEgreso"
})
export class OrdenIngresoEgresoPipe implements PipeTransform {
  transform(items: IngresoEgreso[], args?: any): IngresoEgreso[] {
    console.log(items);
    return items.sort((a, b) => {
      if (a.tipo === "ingreso") {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
