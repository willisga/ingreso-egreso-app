import { IngresoEgreso } from "./ingreso-egreso.model";
import * as fromIngresoEgreso from "./ingreso-egreso.actions";
import { AppState } from "../app.reducer";

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}

export const initIngresoEgresoState: IngresoEgresoState = {
  items: []
};

export interface AppIngresoEgresoState extends AppState {
  ingresoEgreso: IngresoEgresoState;
}

export function ingresoEgresoReducer(
  state: IngresoEgresoState = initIngresoEgresoState,
  action: fromIngresoEgreso.IngresoEgresoActions
): IngresoEgresoState {
  switch (action.type) {
    case fromIngresoEgreso.IngresoEgresoActionsType.SET_ITEMS:
      return {
        items: [
          ...action.payload.map(item => {
            return {
              ...item
            };
          })
        ]
      };
    case fromIngresoEgreso.IngresoEgresoActionsType.UNSET_ITEMS:
      return {
        items: []
      };
    default:
      return state;
  }
}
