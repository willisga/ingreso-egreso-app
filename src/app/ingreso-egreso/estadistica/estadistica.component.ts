import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { IngresoEgreso } from "../ingreso-egreso.model";
import { AppIngresoEgresoState } from "../ingreso-egreso.reducer";

@Component({
  selector: "app-estadistica",
  templateUrl: "./estadistica.component.html",
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number;

  suscription: Subscription = new Subscription();

  doughnutChartLabels: string[] = ["Ingresos", "Egresos"];
  doughnutChartData: number[] = [];

  doughnutChartColours: any[] = [
    {
      backgroundColor: [ "#86c7f3", "#ffa1b5"],
    }
  ];

  constructor(private store: Store<AppIngresoEgresoState>) {}

  ngOnInit() {
    this.suscription = this.store
      .select("ingresoEgreso")
      .subscribe(ingresoEgreso => {
        this.contarIngresoEgreso(ingresoEgreso.items);
      });
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    items
      .filter(item => item.tipo === "ingreso")
      .map(item => {
        this.ingresos += item.monto;
        this.cuantosIngresos += 1;
      });
    items
      .filter(item => item.tipo === "egreso")
      .map(item => {
        this.egresos += item.monto;
        this.cuantosEgresos += 1;
      });

    this.doughnutChartData = [this.ingresos, this.egresos];
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
}
