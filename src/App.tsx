import React from 'react';
import { connect } from 'react-redux';
import NoteList from "./components/NoteList";

const App = () => {
  return (
      <NoteList />
  );
}

export default connect(null)(App);
