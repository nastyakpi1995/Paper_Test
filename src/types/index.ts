import { typesAction } from "redux/saga/typesAction";

export interface INote {
  id?: number;
  text?: string;
  created?: string;
  lastUpdated?: string;
}
export interface IValuesAddNote {
  text?: string;
}
interface INoteListState {
  noteList: INote[];
  loading: boolean;
  errors: string;
}

export interface IState {
  noteList: INoteListState;
}

export type ActionTypes = {
  type: typeof typesAction.ADD_NEW_NOTE;
  data: INote[];
};
