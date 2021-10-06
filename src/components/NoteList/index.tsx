import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { requestGetNoteList } from "../../redux/saga/actions";
import { Button, Modal } from 'antd';
import NoteComponent from "../Note";
import AddNoteFormComponent from "../AddNoteForm";
import {INote, IState} from "../../types";
import {styles} from "./styles";

interface INoteList {
    noteList: INote[];
    requestGetNoteList: () => void;
}

const NoteList = ({requestGetNoteList, noteList}: INoteList) => {
    const [currentNote, setCurrentNote] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    useEffect(() => {
        setCurrentNote(noteList[0])
    }, [noteList])

    useEffect(() => {
        requestGetNoteList()
    },[])

    const onClickItem = (id?: number) => {
        const newSelectItem = noteList.filter((el: INote) => el.id === id);
        setCurrentNote(newSelectItem[0])
    }

    return (
        <div style={styles.mainWrap}>
            <div>
                {noteList?.map((el: INote) => (
                    <div key={el.id} onClick={() => onClickItem(el?.id)}>
                        <NoteComponent currentNote={el} />
                    </div>
                ))}
            </div>
            {currentNote && (
                <div>
                    <NoteComponent currentNote={currentNote} />
                    <Button onClick={showModal} style={{marginTop: 30}}>Add new note</Button>
                </div>
            )}
            <Modal visible={isModalVisible} onOk={handleCancel} onCancel={handleCancel}>
                <AddNoteFormComponent onCancel={handleCancel} />
            </Modal>

        </div>
    )
}

const mapStateToProps = (state: IState) => {
    return ({
        noteList: state.noteList.noteList,
        loading: state.noteList.loading
    })
}

export default connect(mapStateToProps, {requestGetNoteList})(NoteList)