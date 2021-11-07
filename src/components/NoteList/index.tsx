import React, { useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { requestGetNoteList } from 'redux/saga/actions'
import { Button, Drawer, List } from 'antd'
import NoteDetails from 'components/NoteDetails'
import NoteComponent from 'components/Note';
import AddNoteFormComponent from 'components/AddNoteForm'
import { INote, IState, IValuesAddNote } from 'types'
import { styles } from './styles'
import moment from 'moment'

interface INoteList {
    requestGetNoteList: () => void
}

const NoteList = ({ requestGetNoteList }: INoteList) => {
    const [currentNoteDetails, setCurrentNoteDetails] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [noteList, setNoteList] = useState<INote[] | null>(null)

    const showModal = () => setIsModalVisible(true)
    const handleCancel = () => setIsModalVisible(false)

    useEffect(() => {
        if (!noteList) {
            requestGetNoteList()
        }
    }, [])
    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]')
        setNoteList(notes)
        setCurrentNoteDetails(notes[0])
    }, [])

    const onClickItem = (id?: number) => {
        if (noteList) {
            const newSelectItem = noteList?.filter((el: INote) => el.id === id)
            setCurrentNoteDetails(newSelectItem[0])
        }
    }

    const handleAddNote = (values: IValuesAddNote) => {
        const date = new Date()
        const fullDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`

        const newNote = {
            id: date.getMilliseconds(),
            text: values.text,
            created: fullDate,
            lastUpdated: fullDate,
        }

        const newNoteList = noteList && [...noteList, newNote]
        localStorage.setItem('notes', JSON.stringify(newNoteList))
        setNoteList(newNoteList)
        handleCancel()
    }
    const handleEditNote = (values: IValuesAddNote) => {
        const date = new Date()
        const fullDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`

        const newNoteList = noteList && noteList.map((el: INote) => {
            if (el.id === values.id) {
                el.text = values.text
                el.lastUpdated = fullDate
            }
            return el
        })
        localStorage.setItem('notes', JSON.stringify(newNoteList))
        setNoteList(newNoteList)
    }
    const handleDeleteNote = (id?: number) => {
        if (noteList !== null) {
            const newNoteList = noteList.filter((el: INote) => el.id !== id)
            localStorage.setItem('notes', JSON.stringify(newNoteList))
            setNoteList(newNoteList)
            setCurrentNoteDetails(newNoteList[0])
        }
    }

    return noteList ? (
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
    ) : <div>loadding</div>
}

const mapStateToProps = (state: IState) => {
    return {
        loading: state.noteList.loading,
    }
}

export default connect(mapStateToProps, { requestGetNoteList })(NoteList)
