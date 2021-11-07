import { INote } from '../../types'
import { typesAction } from './typesAction'

export const successGetNoteList = (data: INote[]) => ({
    type: typesAction.SUCCESS_GET_NOTE_LIST,
    data,
})

export const requestGetNoteList = () => ({
    type: typesAction.NOTE_FETCH_REQUESTED,
})

export const updateNote = (newNoteList: INote[]) => ({
    type: typesAction.UPDATE_NOTE,
    data: newNoteList,
})

// export const errorGetNoteList = (data: any) => ({
//     type: typesAction.ERROR_GET_NOTE_LIST,
//     data
// })
