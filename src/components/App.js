import React, { Component, Fragment } from 'react';
import Timeline from './Timeline';
import { connect } from 'react-redux';
import handleGetInitialData from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import AddTweet from './AddTweet';
import TweetPage from './TweetPage';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetInitialData());
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        {this.props.loading === true
          ? null
          : <div className='container'>
              <Timeline />
              <AddTweet />
              <TweetPage match={{params: {id: '6h5ims9iks66d4m7kqizmv'}}} />
            </div>}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({ 
  loading: authedUser === null 
});

export default connect(mapStateToProps)(App);