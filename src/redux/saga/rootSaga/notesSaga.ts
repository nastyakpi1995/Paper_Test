import { takeLatest, put } from 'redux-saga/effects'
import { typesAction } from 'redux/saga/typesAction'
import { successGetNoteList } from 'redux/saga/actions'
import noteListData from 'data/noteListData';

function* noteFetchToAsync() {
    try {
        const noteList = noteListData()

        yield put(successGetNoteList(noteList))
    } catch (e) {
        console.log(e)
        // yield put(errorGetNoteList(e))
    }
}

export function* notesSaga() {
    yield takeLatest(typesAction.NOTE_FETCH_REQUESTED, noteFetchToAsync)
}
