import React, { Fragment } from 'react';
import Tweet from './Tweet';
import AddTweet from './AddTweet';
import { connect } from 'react-redux';

const TweetPage = ({ id, replies }) => (
  <div>
    <Tweet id={ id } />
    <AddTweet replyingTo={ id } />

    {replies.length > 0  && 
      <Fragment>
        <h3 style={style}>Replies</h3>
        <ul>
          {replies.map(reply => (
            <li key={ reply.id }>
              <Tweet id={ reply.id } />
            </li>
          ))}
        </ul>
      </Fragment>}
  </div>
)

const style = { textAlign: 'center' }

const mapStateToProps = ({ tweets }, { match }) => {
  const { id } = match.params;
  const replies = tweets[id].replies
    .map(reply => tweets[reply])
    .sort((a,b) => b.timestamp - a.timestamp);

  return {
    id,
    replies
  }
}

export default connect(mapStateToProps)(TweetPage)
