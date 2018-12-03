import { Action } from "@ngrx/store";
import { IngresoEgreso } from "./ingreso-egreso.model";

export enum IngresoEgresoActionsType {
  SET_ITEMS = "[Ingreso Egreso] Set Items",
  UNSET_ITEMS = "[Ingreso Egreso] Unset Items"
}

export class SetItemsActions implements Action {
  readonly type = IngresoEgresoActionsType.SET_ITEMS;
  constructor(public payload: IngresoEgreso[]) {}
}

export class UnsetItemsActions implements Action {
  readonly type = IngresoEgresoActionsType.UNSET_ITEMS;
}

export type IngresoEgresoActions = SetItemsActions | UnsetItemsActions;
