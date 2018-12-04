import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import { IngresoEgresoService } from "../../ingreso-egreso/ingreso-egreso.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  name: string;
  suscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.suscription = this.store
      .select("auth")
      .pipe(filter(auth => auth.user !== null))
      .subscribe(auth => (this.name = auth.user.name));
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  logout() {
    this.ingresoEgresoService.dispose();
    this.authService.logout();
  }
}
