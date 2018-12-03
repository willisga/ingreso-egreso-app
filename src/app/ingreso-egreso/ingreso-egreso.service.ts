import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { IngresoEgreso } from "./ingreso-egreso.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class IngresoEgresoService {
  constructor(
    private authService: AuthService,
    private firebaseDB: AngularFirestore
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    return this.firebaseDB
                .doc(`${this.authService.getUser().uid}/ingreso-egreso`)
                .collection("items")
                .add({ ...ingresoEgreso });
  }
}
