import React, { useState } from 'react'
import { INote, IValuesAddNote } from 'types'
import { Button, Card, Drawer } from 'antd'
import AddNoteFormComponent from 'components/AddNoteForm'

interface INoteComponent {
    currentNote: INote
    onClickItem?: () => void
    handleEditNote: (values: IValuesAddNote) => void;
    handleDeleteNote: (id?: number) => void;
}
const NoteComponent = (props: INoteComponent) => {
    const { id, text, created, lastUpdated } = props?.currentNote
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => setIsModalVisible(true)
    const handleCancel = () => setIsModalVisible(false)


    return (
        <div>
            <Card title={text}>
                <p>id: {id}</p>
                <p>created: {created}</p>
                <p>lastUpdated: {lastUpdated}</p>
                <Button onClick={showModal} style={{ marginTop: 30 }}>
                    edit
                </Button>
                <Button onClick={() => props.handleDeleteNote(id)} style={{ marginTop: 30 }}>
                    delete
                </Button>
            </Card>

            <Drawer title="Edit note" width={720} onClose={handleCancel} visible={isModalVisible}>
                <AddNoteFormComponent currentNote={props.currentNote} handleClick={props.handleEditNote} handleCancel={handleCancel}/>
            </Drawer>
        </div>
    )
}

export default NoteComponent
