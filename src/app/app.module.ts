import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { environment } from "src/environments/environment";

// Modules Routing
import { AppRoutingModule } from "./app.routing";

// Components
import { AppComponent } from "./app.component";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

// NgRx
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

// Reducers
import { AppState, appReducer } from "./app.reducer";

// Modules App
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    AppRoutingModule,

    // Modules App
    AuthModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features

    // NgRx
    StoreModule.forRoot<AppState>(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
