import { Action } from "@ngrx/store";
import { User } from "./user.model";

export enum AuthActionsType {
  SET_USER = "[Auth] Set User",
  UNSET_USER = "[Auth] Unset User"
}

export class SetUserAction implements Action {
  readonly type = AuthActionsType.SET_USER;
  constructor(public payload: User) {}
}

export class UnsetUserAction implements Action {
  readonly type = AuthActionsType.UNSET_USER;
}

export type AuthActions = SetUserAction | UnsetUserAction;
