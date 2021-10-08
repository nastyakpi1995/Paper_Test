import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { requestGetNoteList } from "../../redux/saga/actions";
import { Button, Drawer, List } from 'antd';
import NoteComponent from "../Note";
import AddNoteFormComponent from "../AddNoteForm";
import { INote, IState } from "../../types";
import { styles } from "./styles";

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
                <List
                   dataSource={noteList}
                   renderItem={item => (
                       <List.Item
                           key={item.id}
                           style={styles.list}
                           onClick={() => onClickItem(item?.id)}
                       >
                           <List.Item.Meta
                               title={item.text}
                               description={item.id}
                           />
                       </List.Item>
                   )}
                />

                <div>
                    {currentNote && (<NoteComponent currentNote={currentNote} />  )}
                    <Button onClick={showModal} style={{marginTop: 30}}>Add new note</Button>
                </div>

            <Drawer
                title="Create a new note"
                width={720}
                onClose={handleCancel}
                visible={isModalVisible}
            >
                <AddNoteFormComponent onCancel={handleCancel} />
            </Drawer>

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