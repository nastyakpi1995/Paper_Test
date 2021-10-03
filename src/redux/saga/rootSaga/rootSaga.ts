import { all } from 'redux-saga/effects';
import {startSagas} from "./categorySaga";

export function * rootSaga() {
    yield all([startSagas()])
}
