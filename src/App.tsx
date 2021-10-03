import React from 'react';
import { connect } from 'react-redux';

const App = () => {
  return (<div style={{background: 'red'}}>dfdfd</div>);
}

const mapStateToProps = (store: any) => {
  return ({
    user: store.user
  })
}
export default connect(mapStateToProps)(App);
