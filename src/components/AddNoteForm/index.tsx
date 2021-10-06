import React from "react";
import {Form, Input, Button} from "antd";

import { addNewNote } from "../../redux/saga/actions";
import {connect} from "react-redux";
import {INote, IState, IValuesAddNote} from "../../types";

interface IAddNoteFormComponent {
    noteList: INote[];
    addNewNote: (noteList: INote[]) => void;
    onCancel: () => void;
}

const AddNoteFormComponent = ({noteList, addNewNote, onCancel}: IAddNoteFormComponent) => {
    const [form] = Form.useForm();
    const initialValues = {
        text: '',
    }

    const handleAddNote = (values: IValuesAddNote) => {
        const date = new Date()
        const fullDate = new Date().getMonth() + '.' + new Date().getUTCDay() + '.' + new Date().getUTCFullYear();

        const newNote = {
            id: date.getMilliseconds(),
            text: values.text,
            created: fullDate,
            lastUpdated: fullDate
        }
        const newNoteList = [...noteList, newNote]
        addNewNote(newNoteList)
        onCancel()
    }

    return (
        <Form form={form} layout="vertical" initialValues={initialValues}  onFinish={handleAddNote}>
            <Form.Item label="Text" required tooltip="This is a required field" name='text'>
                <Input  placeholder="input placeholder" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType='submit'>Submit</Button>
            </Form.Item>
        </Form>
    )
}
const mapStateToProps = (state: IState) => {
    return ({
        noteList: state.noteList.noteList,
        loading: state.noteList.loading
    })
}

export default connect(mapStateToProps, {addNewNote})(AddNoteFormComponent)
