import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers';

class Tweet extends Component {

  render() {
    const { text, author, authorAvatar, timestamp, likes, replies, replyingTo } = this.props;

    return (
      <div className='tweet'>
        <img className='avatar' src={ authorAvatar } alt={ author } />
        <div className="tweet-info">
          <div className='author'>{ author }</div>
          <div className='timestamp'>{ timestamp }</div>
          {replyingTo !== null && <div className='replying-to'>Replying To @{ replyingTo }</div>}
          <p>{ text }</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users, tweets }, { id }) => {
  const soloTweet = tweets[id];
  const { text, author, timestamp, likes, replies, replyingTo } = soloTweet;

  return {
    text,
    author: users[author].name,
    authorAvatar: users[author].avatarURL,
    timestamp: formatDate(timestamp),
    likes: likes.length,
    replies: replies.length,
    replyingTo: replyingTo === null ? null : tweets[replyingTo].author
  }
}

export default connect(mapStateToProps)(Tweet);