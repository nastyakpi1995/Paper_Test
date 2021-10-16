import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { requestGetNoteList } from 'redux/saga/actions'
import { Button, Drawer, List } from 'antd'
import NoteDetails from 'components/NoteDetails'
import NoteComponent from 'components/Note';
import AddNoteFormComponent from 'components/AddNoteForm'
import { INote, IState, IValuesAddNote } from 'types'
import { styles } from './styles'
import moment from 'moment'
import { updateNote } from 'redux/saga/actions'

interface INoteList {
    noteList: INote[]
    updateNote: (noteList: INote[]) => void
    requestGetNoteList: () => void
}

const NoteList = ({ requestGetNoteList, noteList, updateNote }: INoteList) => {
    const [currentNoteDetails, setCurrentNoteDetails] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => setIsModalVisible(true)
    const handleCancel = () => setIsModalVisible(false)

    useEffect(() => {
        setCurrentNoteDetails(noteList[0])
    }, [noteList])

    useEffect(() => {
        requestGetNoteList()
    }, [])

    const onClickItem = (id?: number) => {
        const newSelectItem = noteList.filter((el: INote) => el.id === id)
        setCurrentNoteDetails(newSelectItem[0])
    }

    const handleAddNote = (values: IValuesAddNote) => {
        const date = new Date()
        const fullDate = moment().format('MMMM Do YYYY, h:mm:ss a')

        const newNote = {
            id: date.getMilliseconds(),
            text: values.text,
            created: fullDate,
            lastUpdated: fullDate,
        }

        const newNoteList = [...noteList, newNote]
        updateNote(newNoteList)
        handleCancel()
    }
    const handleEditNote = (values: IValuesAddNote) => {
        const fullDate = moment().format('MMMM Do YYYY, h:mm:ss a')

        const newNoteList = noteList.map((el) => {
            if (el.id === values.id) {
                el.text = values.text
                el.lastUpdated = fullDate
            }
            return el
        })

        updateNote(newNoteList)
    }
    const handleDeleteNote = (id?: number) => {
        const newNoteList = noteList.filter(el => el.id !== id)

        updateNote(newNoteList)
    }

    return (
        <div style={styles.mainWrap}>
            <List
                dataSource={noteList}
                renderItem={(item) =>
                    <NoteComponent
                        handleDeleteNote={handleDeleteNote}
                        handleEditNote={handleEditNote}
                        currentNote={item}
                        onClickItem={onClickItem}
                    />}
            />
            <div>
                {currentNoteDetails && <NoteDetails handleDeleteNote={handleDeleteNote} handleEditNote={handleEditNote} currentNote={currentNoteDetails} />}
                <Button onClick={showModal} style={{ marginTop: 30 }}>
                    Add new note
                </Button>
            </div>

            <Drawer title="Create a new note" width={720} onClose={handleCancel} visible={isModalVisible}>
                <AddNoteFormComponent handleClick={handleAddNote} handleCancel={handleCancel} />
            </Drawer>
        </div>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        noteList: state.noteList.noteList,
        loading: state.noteList.loading,
    }
}

export default connect(mapStateToProps, { requestGetNoteList, updateNote })(NoteList)
