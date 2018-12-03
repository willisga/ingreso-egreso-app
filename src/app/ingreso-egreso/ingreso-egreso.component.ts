import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IngresoEgreso } from "./ingreso-egreso.model";
import { IngresoEgresoService } from "./ingreso-egreso.service";

// SwithAlert
import Swal from "sweetalert2";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { StartLoadingAction, EndLoadingAction } from "../shared/ui.actions";
import { Subscription } from "rxjs";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  frmIngresoEgreso: FormGroup;
  tipo = "ingreso";
  isLoading: boolean;

  loadingSubscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // Configuramos el formulario reactivo
    this.frmIngresoEgreso = this.formBuilder.group({
      description: [
        "",
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      monto: [
        0,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.pattern("[0-9]+")
        ])
      ]
    });

    // Obtebnemos el estado de la aplicación
    this.loadingSubscription = this.store
      .select("ui")
      .subscribe(ui => (this.isLoading = ui.isLoading));
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new StartLoadingAction());

    const ingresoEgreso = new IngresoEgreso({
      ...this.frmIngresoEgreso.value,
      tipo: this.tipo
    });

    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.frmIngresoEgreso.reset({ monto: 0 });
        Swal("Creado", ingresoEgreso.description, "success");
        this.store.dispatch(new EndLoadingAction());
      })
      .catch(error => {
        Swal("Error en el register", error.message, "error");
        this.store.dispatch(new EndLoadingAction());
      });
  }
}
