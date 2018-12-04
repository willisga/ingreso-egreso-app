import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { User } from "src/app/auth/user.model";
import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent implements OnInit {

  user: Observable<string> = this.store.select("auth").pipe(
    filter(auth => auth.user !== null),
    map(auth => auth.user.name)
  );

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}
}
