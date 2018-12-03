import { Action } from "@ngrx/store";

export enum UIActionsTypes {
  START_LOADING = "[UI] Cargando...",
  END_LOADING = "[UI] Fin Cargando..."
}

export class StartLoadingAction implements Action {
  readonly type = UIActionsTypes.START_LOADING;
  constructor(public payload?: any) {}
}

export class EndLoadingAction implements Action {
  readonly type = UIActionsTypes.END_LOADING;
  constructor(public payload?: any) {}
}

export type UIActions = StartLoadingAction | EndLoadingAction;
