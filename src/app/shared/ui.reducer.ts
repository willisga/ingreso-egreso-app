import * as fromUI from "./ui.actions";

export interface UIState {
  isLoading: boolean;
}

const initUIState: UIState = {
  isLoading: false
};

export function uiReducer(
  state: UIState = initUIState,
  action: fromUI.UIActions
): UIState {
  switch (action.type) {
    case fromUI.UIActionsTypes.START_LOADING:
      return {
        isLoading: true
      };
    case fromUI.UIActionsTypes.END_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}
