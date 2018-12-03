import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth.service";
import { AppState } from "src/app/app.reducer";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean;
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

  login(data) {
    this.authService.login(data.email, data.password);
  }
}
