import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// NgRx
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from "./ingreso-egreso.reducer";

// Customs Module
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "../dashboard/dashboard.routing";

// Components
import { DetalleComponent } from "./detalle/detalle.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

// Pipes
import { OrdenIngresoEgresoPipe } from "./orden-ingreso-egreso.pipe";

// Charts
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ],
  providers: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)
  ]
})
export class IngersoEgresoModule {}
