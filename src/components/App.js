import React, { Component } from 'react';
import Timeline from './Timeline';
import { connect } from 'react-redux';
import handleGetInitialData from '../actions/shared';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetInitialData());
  }

  render() {
    return (
      <div className='container'>
        <Timeline />
      </div>
    )
  }
}

const mapStateToProps = () => ({ });

export default connect(mapStateToProps)(App);