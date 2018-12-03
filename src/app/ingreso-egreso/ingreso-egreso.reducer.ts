import { IngresoEgreso } from "./ingreso-egreso.model";
import * as fromIngresoEgreso from "./ingreso-egreso.actions";

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}

export const initIngresoEgresoState: IngresoEgresoState = {
  items: []
};

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
