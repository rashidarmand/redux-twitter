import React, { Component, Fragment } from 'react';
import Timeline from './Timeline';
import { connect } from 'react-redux';
import handleGetInitialData from '../actions/shared';
import LoadingBar from 'react-redux-loading';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetInitialData());
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        <div className='container'>
          <Timeline />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({ 
  loading: authedUser === null 
});

export default connect(mapStateToProps)(App);