import React from "react";
import {INote} from "../../types";

interface INoteComponent {
    selectItem: INote;
}
const NoteComponent = (props: INoteComponent) => {
    const {id, text, created, lastUpdated} = props?.selectItem

    return (
        <div>
            <div>{id}</div>
            <div>{text}</div>
            <div>{created}</div>
            <div>{lastUpdated}</div>
        </div>
    )
}


export default NoteComponent;