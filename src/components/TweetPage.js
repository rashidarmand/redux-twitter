import React, { Component } from 'react';
import Tweet from './Tweet';
import AddTweet from './AddTweet';
import { connect } from 'react-redux';

class TweetPage extends Component {
  render() {
    const { id, replies } = this.props;


    return (
      <div>
        <h2 style={style}>Tweet Page</h2>
        <Tweet id={ id } />
        <AddTweet />

        <h3 style={style}>Replies</h3>
        <ul>
          {replies.map(reply => (
            <li key={ reply.id }>
              <Tweet id={ reply.id } />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const style = { textAlign: 'center' }

const mapStateToProps = ({ users, tweets, authedUser }, { match }) => {
  const { id } = match.params;
  const replies = tweets[id].replies
    .map(reply => tweets[reply])
    .sort((a,b) => b.timestamp - a.timestamp);

  return {
    id,
    replies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetPage)
