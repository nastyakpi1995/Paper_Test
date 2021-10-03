import {takeLatest, put} from 'redux-saga/effects';
import {types} from "../types";

function * startToAsync() {
    yield put({type: types.START_ASYNC})
}

export function * startSagas() {
    yield takeLatest(types.START, startToAsync)
}