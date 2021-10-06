import {takeLatest, put} from 'redux-saga/effects';
import noteListData from '../../../data/noteListData';
import {typesAction} from "../typesAction";
import { successGetNoteList} from "../actions";

function * noteFetchToAsync() {
    try{
        yield put(successGetNoteList(noteListData()))
    } catch (e) {
        console.log(e)
        // yield put(errorGetNoteList(e))
    }
}

export function * notesSaga() {
    yield takeLatest(typesAction.NOTE_FETCH_REQUESTED, noteFetchToAsync)
}