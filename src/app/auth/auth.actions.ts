import { Action } from "@ngrx/store";
import { User } from "./user.model";

export enum AuthActionsType {
  SET_USER = "[Auth] Set User"
}

export class SetUserAction implements Action {
  readonly type = AuthActionsType.SET_USER;
  constructor(public payload: User) {}
}

export type AuthActions = SetUserAction;
