import React from 'react'
import { connect } from 'react-redux'

import { Form, Input, Button } from 'antd'
import { IState, IValuesAddNote } from 'types'
import { INote } from '../../types'

interface IAddNoteFormComponent {
    handleClick: (values: IValuesAddNote) => void
    currentNote?: INote;
    handleCancel: () => void;
}

const AddNoteFormComponent = ({ handleClick, currentNote, handleCancel }: IAddNoteFormComponent) => {
    const [form] = Form.useForm()

    const initialValues = {
        text: currentNote ? currentNote.text : '',
    }

    const onFinish = (values: any) => {
        const prepareData = {
            ...values,
            id: currentNote ? currentNote.id : '',
        }
        handleCancel()
        handleClick(prepareData)
    }

    return (
        <Form form={form} layout="vertical" initialValues={initialValues} onFinish={(values) => onFinish(values)}>
            <Form.Item label="Text" required tooltip="This is a required field" name="text">
                <Input placeholder="input placeholder" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
const mapStateToProps = (state: IState) => {
    return {
        noteList: state.noteList.noteList,
        loading: state.noteList.loading,
    }
}

export default connect(mapStateToProps, null)(AddNoteFormComponent)
