import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { requestGetNoteList } from "../../redux/saga/actions";
import { Button, Modal } from 'antd';
import NoteComponent from "../Note";
import AddNoteFormComponent from "../AddNoteForm";
import {INote, IState} from "../../types";

interface INoteList {
    noteList: INote[];
    requestGetNoteList: () => void;
}

const NoteList = ({requestGetNoteList, noteList}: INoteList) => {
    const [selectItem, setSelectItem] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    useEffect(() => {
        setSelectItem(noteList[0])
    }, [noteList])

    useEffect(() => {
        requestGetNoteList()
    },[])

    const onClickItem = (id?: number) => {
        const newSelectItem = noteList.filter((el: INote) => el.id === id);
        setSelectItem(newSelectItem[0])
    }

    return (
        <div style={{border: '1px solid', paddingLeft: 420, paddingRight: 420, marginTop: 20, margin: 20, display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
            <div>
                {noteList?.map((el: INote) => (
                    <div key={el.id} onClick={() => onClickItem(el?.id)}>
                        <NoteComponent selectItem={el} />
                    </div>
                ))}
            </div>
            {selectItem && (
                <div>
                    <NoteComponent selectItem={selectItem} />
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