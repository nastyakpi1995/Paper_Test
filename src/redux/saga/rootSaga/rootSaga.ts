import { all } from "redux-saga/effects";
import { notesSaga } from "redux/saga/rootSaga/notesSaga";

export function* rootSaga() {
  yield all([notesSaga()]);
}
