import React from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers';
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { handleLikeTweet } from '../actions/tweets';

const Tweet = (props) => {
  const { text, author, authorAvatar, timestamp, liked, likes, replies, replyingTo, toggleLike, id } = props;
  const filled = { color: 'rgb(224, 36, 94)' };

  return (
    <div className='tweet'>
      <img className='avatar' src={ authorAvatar } alt={ author } />
      <div className="tweet-info">
        <div className='author'>{ author }</div>
        <div className='timestamp'>{ timestamp }</div>
        {replyingTo !== null && <div className='replying-to'>Replying To @{ replyingTo }</div>}
        <p>{ text }</p>
        <div className="tweet-icons">
          <TiArrowBackOutline className='tweet-icon' /> <span className='buffer' /> { replies > 0 && replies }
          <span className='spacer' />
          {liked 
            ? <TiHeartFullOutline onClick={ () => toggleLike(id, liked) } style={ filled } className='tweet-icon' /> 
            : <TiHeartOutline onClick={ () => toggleLike(id, liked) } className='tweet-icon' />} 
          <span className='buffer' /> { likes > 0 && likes }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ users, tweets, authedUser }, { id }) => {
  const soloTweet = tweets[id];
  const { text, author, timestamp, likes, replies, replyingTo } = soloTweet;

  return {
    text,
    author: users[author].name,
    authorAvatar: users[author].avatarURL,
    timestamp: formatDate(timestamp),
    liked: likes.includes(authedUser),
    likes: likes.length,
    replies: replies.length,
    replyingTo: replyingTo === null ? null : tweets[replyingTo].author
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleLike(id, liked) {
      dispatch(handleLikeTweet({
        id,
        hasLiked: liked
      }));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);