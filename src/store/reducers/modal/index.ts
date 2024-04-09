import { EModalActions, ModalActionTypes } from "../../../models/modal";

const initialState = {
  open: false,
};

export const Modal = (state = initialState, action: ModalActionTypes) => {
  switch (action.type) {
    case EModalActions.TOGGLE_MODAL:
      return {
        ...state,
        open: !state.open,
      };

    default:
      return state;
  }
};
