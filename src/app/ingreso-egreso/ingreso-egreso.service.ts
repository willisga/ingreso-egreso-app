import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { IngresoEgreso } from "./ingreso-egreso.model";
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { filter, map } from "rxjs/operators";
import { SetItemsActions, UnsetItemsActions } from "./ingreso-egreso.actions";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IngresoEgresoService {
  private ingresosEgresoListenerSuscription: Subscription = new Subscription();
  private ingresoEgresoItemsSuscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private firebaseDB: AngularFirestore,
    private store: Store<AppState>
  ) {}

  dispose() {
    this.ingresosEgresoListenerSuscription.unsubscribe();
    this.ingresoEgresoItemsSuscription.unsubscribe();
    this.store.dispatch(new UnsetItemsActions());
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    return this.firebaseDB
      .doc(`${this.authService.getUser().uid}/ingreso-egreso`)
      .collection("items")
      .add({ ...ingresoEgreso });
  }

  initIngresoEgresoListener() {
    this.ingresosEgresoListenerSuscription = this.store
      .select("auth")
      .pipe(filter(auth => auth.user !== null))
      .subscribe(auth => this.ingresoEgresoItems(auth.user.uid));
  }

  deleteIngresoEgreso(uid: string) {
    const user = this.authService.getUser();

    return this.firebaseDB
      .doc(`${user.uid}/ingreso-egreso/items/${uid}`)
      .delete();
  }

  private ingresoEgresoItems(uid) {
    this.ingresoEgresoItemsSuscription = this.firebaseDB
      .collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        // map de rxjs
        map(items => {
          // map de javascript
          return items.map(item => {
            return {
              uid: item.payload.doc.id,
              ...item.payload.doc.data()
            };
          });
        })
      )
      .subscribe((items: any[]) => {
        const actions = new SetItemsActions(items);
        this.store.dispatch(actions);
      });
  }
}
