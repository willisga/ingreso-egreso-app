import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

// Firebase
import * as firebase from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";

// SwithAlert
import Swal from "sweetalert2";

// Models
import { IUser, User } from "./user.model";
import { AppState } from "../app.reducer";

// NgRX
import { Store } from "@ngrx/store";

// Actions
import * as fromUIActions from "../shared/ui.actions";
import * as fromAuthAction from "./auth.actions";
import { UnsetUserAction } from "./auth.actions";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  /**
   * Propiedad tipo de suscripción que esta asociada a los datos del usuario de Firebase
   */
  private suscriptionUserFirebase: Subscription = new Subscription();
  private user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseDB: AngularFirestore,
    private store: Store<AppState>
  ) {}

  /**
   * Metodo encargado de crear un usuario
   * @description El usuario es creado en el sistema de autenticación de firebase y en la base de datos con la información detalle
   * @param name Nombre del Usuario a registrar
   * @param email Correo electronico del usuario a registrar
   * @param password Contraseña del usuario a registrar
   */
  createUser(name: string, email: string, password: string) {
    // Indicamos que se inicio el cargando
    this.store.dispatch(new fromUIActions.StartLoadingAction());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        // Creamos el usuario a partir del modelo
        const user: IUser = {
          uid: response.user.uid,
          email: response.user.email,
          name: name
        };

        // Creamos el usuario en la base de datos
        this.firebaseDB
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            // Enrutamos al dashboard
            this.router.navigate(["/"]);

            // Indicamos que se termino el stado del cargando
            this.store.dispatch(new fromUIActions.EndLoadingAction());
          });
      })
      .catch(error => {
        // Alertamos del error
        Swal("Error en el register", error.message, "error");

        // Indicamos que se termino el stado del cargando
        this.store.dispatch(new fromUIActions.EndLoadingAction());
      });
  }

  /**
   * Metodo encargado de loguear a un usuario
   * @param email Email del usuario a loguear
   * @param password Contraseña del usuario a loguear
   */
  login(email: string, password: string) {
    this.store.dispatch(new fromUIActions.StartLoadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.router.navigate(["/"]);
        this.store.dispatch(new fromUIActions.EndLoadingAction());
      })
      .catch(error => {
        Swal("Error en el Login", error.message, "error");
        this.store.dispatch(new fromUIActions.EndLoadingAction());
      });
  }

  /**
   * Metodo encargado de desloguear a un usuario que se encuentre logueado en el sistema
   */
  logout() {
    this.afAuth.auth
      .signOut()
      .then(response => {
        this.router.navigate(["/login"]);
        this.store.dispatch(new UnsetUserAction());
      })
      .catch(error => Swal("Error en el Logout", error.message, "error"));
  }

  /**
   * Metodo encargado de asignar el usuario al state manager
   */
  initAuthListener() {
    this.afAuth.authState.subscribe((firebaseUser: firebase.User) => {
      if (firebaseUser) {
        // Obtenemos la inforamción de la base de datos de Firebase
        // Se asigna a la suscripción, para cuando el usuario se desloguee, no quede escuchando los cambios de la base de datos
        this.suscriptionUserFirebase = this.firebaseDB
          .doc(`${firebaseUser.uid}/usuario`)
          .valueChanges()
          .subscribe((user: any) => {
            this.user = user;
            // Invocamos la acción
            this.store.dispatch(new fromAuthAction.SetUserAction(user));
          });
      } else {
        this.user = null;
        // Invocamos el unsuscribe para desconectar contra firebase
        this.suscriptionUserFirebase.unsubscribe();
      }
    });
  }

  /**
   * Metodo encargado de validar si el usuario se encuentra autenticado en el sistema
   */
  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser === null) {
          this.router.navigate(["/login"]);
        }

        return fbUser != null;
      })
    );
  }

  /**
   * Metodo encargado de retornar el usuario eliminando la referencia
   */
  getUser() {
    return {
      ...this.user
    };
  }
}
