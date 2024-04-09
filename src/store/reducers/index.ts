import { combineReducers } from "redux";
import { Repositories } from "./repositories";
import { Modal } from "./modal";

const rootReducer = combineReducers({
  Repositories,
  Modal,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
