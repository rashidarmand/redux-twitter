import React, { Component } from 'react';
import Tweet from './Tweet';
import { connect } from 'react-redux';
// import { formatDate, formatTweet } from '../utils/helpers';

class Timeline extends Component {
  render() {
    const { tweetList } = this.props;

    return (
      <div>
        <h1 style={{textAlign: 'center'}}>Timeline</h1>
        <ul>
          {tweetList.map(tweet => (
            <li key={ tweet.id }>
              <Tweet id={ tweet.id } />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ tweets }) => {
  const tweetList = Object.keys(tweets)
    .map(key => tweets[key])
    .sort((a,b) => b.timestamp - a.timestamp)

  return {
    tweetList
  }
}

export default connect(mapStateToProps)(Timeline)