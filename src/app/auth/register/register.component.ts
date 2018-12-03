import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { Subscription } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading = false;
  suscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    // Se maneja la suscripción ya que el ngOnInit se ejecuta cada vez que se carga el login
    // Al manejar la suscripción se optimiza el codigo evitando fugas de memoria
    this.suscription = this.store
      .select("ui")
      .subscribe(ui => (this.isLoading = ui.isLoading));
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  onSubmit(data) {
    this.authService.createUser(data.name, data.email, data.password);
  }
}
