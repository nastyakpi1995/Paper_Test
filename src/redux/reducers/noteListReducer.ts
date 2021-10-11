import { ActionTypes } from "../../types";
import { typesAction } from "redux/saga/typesAction";

const initialState = {
  noteList: [],
  loading: false,
  errors: "",
};
export default (state = initialState, action: ActionTypes) => {
  switch (action?.type) {
    case typesAction.SUCCESS_GET_NOTE_LIST:
      return {
        ...state,
        noteList: action.data,
        loading: false,
      };
    case typesAction.ERROR_GET_NOTE_LIST:
      return {
        ...state,
        errors: action.data,
        loading: false,
      };
    case typesAction.ADD_NEW_NOTE:
      return {
        ...state,
        noteList: action.data,
      };
    default: {
      return state;
    }
  }
};
