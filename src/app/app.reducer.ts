import * as fromUIReducer from "./shared/ui.reducer";
import * as fromAuthReducer from "./auth/auth.reducer";
// import * as fromIngresoEgresoReducer from "./ingreso-egreso/ingreso-egreso.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  ui: fromUIReducer.UIState;
  auth: fromAuthReducer.UserState;
  // ingresoEgreso: fromIngresoEgresoReducer.IngresoEgresoState;
}

export const appReducer: ActionReducerMap<AppState> = {
  ui: fromUIReducer.uiReducer,
  auth: fromAuthReducer.authReducer,
  // ingresoEgreso: fromIngresoEgresoReducer.ingresoEgresoReducer
};
