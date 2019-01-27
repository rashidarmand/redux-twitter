import React, { Component, Fragment } from 'react';
import Timeline from './Timeline';
import { connect } from 'react-redux';
import handleGetInitialData from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import AddTweet from './AddTweet';
import TweetPage from './TweetPage';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Navbar />
          {this.props.loading === true
            ? null
            : <div className='container'>
                <Route path='/' exact component={ Timeline } />
                <Route path='/new-tweet' component={ AddTweet } />
                <Route path='/tweet/:id' component={ TweetPage } />
              </div>}
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({ 
  loading: authedUser === null 
});

export default connect(mapStateToProps)(App);