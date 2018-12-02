import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

// Firebase
import * as firebase from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";

// SwithAlert
import Swal from "sweetalert2";

// Models
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private angularFirebaseDB: AngularFirestore
  ) {}

  /**
   * Metodo encargado de crear un usuario
   * @description El usuario es creado en el sistema de autenticación de firebase y en la base de datos con la información detalle
   * @param name Nombre del Usuario a registrar
   * @param email Correo electronico del usuario a registrar
   * @param password Contraseña del usuario a registrar
   */
  createUser(name: string, email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        // Creamos el usuario a partir del modelo
        const user: User = {
          uid: response.user.uid,
          email: response.user.email,
          name: name
        };

        // Creamos el usuario en la base de datos
        this.angularFirebaseDB
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(["/"]);
          });
      })
      .catch(error => Swal("Error en el register", error.message, "error"));
  }

  /**
   * Metodo encargado de loguear a un usuario
   * @param email Email del usuario a loguear
   * @param password Contraseña del usuario a loguear
   */
  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        this.router.navigate(["/"]);
      })
      .catch(error => Swal("Error en el Login", error.message, "error"));
  }

  /**
   * Metodo encargado de desloguear a un usuario que se encuentre logueado en el sistema
   */
  logout() {
    this.afAuth.auth
      .signOut()
      .then(response => {
        console.log(response);
        this.router.navigate(["/login"]);
      })
      .catch(error => Swal("Error en el Logout", error.message, "error"));
  }

  /**
   * Metodo encargado de escribir en consola el estado del usuario
   */
  initAuthListener() {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      console.log(user);
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
}
