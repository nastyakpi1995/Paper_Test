import React from "react";
import { INote } from "types";
import { Card } from "antd";

interface INoteComponent {
  currentNote: INote;
}
const NoteComponent = (props: INoteComponent) => {
  const { id, text, created, lastUpdated } = props?.currentNote;

  return (
    <Card title={text}>
      <p>id: {id}</p>
      <p>created: {created}</p>
      <p>lastUpdated: {lastUpdated}</p>
    </Card>
  );
};

export default NoteComponent;
