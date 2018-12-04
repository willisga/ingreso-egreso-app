import * as fromAuth from "./auth.actions";
import { User } from "./user.model";

export interface UserState {
  user: User;
}

export const initUserState: UserState = {
  user: null
};

export function authReducer(
  state: UserState = initUserState,
  action: fromAuth.AuthActions
): UserState {
  switch (action.type) {
    case fromAuth.AuthActionsType.SET_USER:
      return {
        user: {
          ...action.payload
        }
      };
    case fromAuth.AuthActionsType.UNSET_USER:
      return {
        user: null
      };
    default:
      return state;
  }
}
