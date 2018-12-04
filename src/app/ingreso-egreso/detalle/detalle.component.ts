import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { IngresoEgreso } from "../ingreso-egreso.model";
import { filter, map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { IngresoEgresoService } from "../ingreso-egreso.service";
import Swal from "sweetalert2";
import { AppIngresoEgresoState } from '../ingreso-egreso.reducer';

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEgresos: IngresoEgreso[] = [];
  private suscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppIngresoEgresoState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.suscription = this.store
      .select("ingresoEgreso")
      .pipe(
        filter(ingresoEgresos => ingresoEgresos.items.length > 0),
        map(ingresoEgresos => ingresoEgresos.items)
      )
      .subscribe(items => (this.ingresoEgresos = items));
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  deleteIngresoEgreso(item: IngresoEgreso) {
    this.ingresoEgresoService
      .deleteIngresoEgreso(item.uid)
      .then(response => {
        console.log(response);
        Swal(
          "Completado",
          `Se elimino correctamente el registro ${item.description}`,
          "success"
        );
      })
      .catch(error => {
        console.error(error);
        Swal("Failed", "No se pudo eliminar el registro", "error");
      });
  }
}
