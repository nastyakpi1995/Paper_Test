import { all } from 'redux-saga/effects';
import {notesSaga} from "./notesSaga";

export function * rootSaga() {
    yield all([notesSaga()])
}
