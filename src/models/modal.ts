export enum EModalActions {
  TOGGLE_MODAL = "@modal/TOGGLE_MODAL",
}

export type ToggleModal = {
  type: EModalActions.TOGGLE_MODAL;
};

export type ModalActionTypes = ToggleModal;
