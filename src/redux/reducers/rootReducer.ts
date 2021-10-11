import { combineReducers } from "redux";

import noteListReducer from "./noteListReducer";

const rootReducer = combineReducers({
  noteList: noteListReducer,
});
export default rootReducer;
