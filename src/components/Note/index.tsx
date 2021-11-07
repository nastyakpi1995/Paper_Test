import React, { useState } from 'react'
import { Button, Drawer, List } from 'antd'
import AddNoteFormComponent from 'components/AddNoteForm'
import { INote, IValuesAddNote } from 'types'
import { styles } from './styles'

interface INoteList {
    onClickItem: (id?: number) => void
    currentNote: INote
    handleDeleteNote: (id?: number) => void;
    handleEditNote: (values: IValuesAddNote) => void;
}

const NoteComponent = ({ currentNote, onClickItem, handleEditNote, handleDeleteNote }: INoteList) => {
    const {id, text} = currentNote
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => setIsModalVisible(true)
    const handleCancel = () => setIsModalVisible(false)

    return (
        <div>
            <List.Item key={id} style={styles.list} onClick={() => onClickItem(id)}>
                <List.Item.Meta title={text} description={id} />
                <Button onClick={() => handleDeleteNote(id)}>X</Button>
                <Button onClick={showModal}>Edit</Button>
            </List.Item>

            <Drawer title={`Edit ${text} note`} width={720} onClose={handleCancel} visible={isModalVisible}>
                <AddNoteFormComponent currentNote={currentNote} handleClick={handleEditNote} handleCancel={handleCancel} />
            </Drawer>
        </div>
    )
}

export default NoteComponent
