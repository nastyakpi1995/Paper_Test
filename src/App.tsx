import React from 'react';
import { connect } from 'react-redux';
import NoteList from "./components/NoteList";
import 'antd/dist/antd.css';

const App = () => {
  return (
      <NoteList />
  );
}

export default connect(null)(App);
