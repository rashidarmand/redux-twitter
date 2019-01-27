import React from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helpers';
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { handleLikeTweet } from '../actions/tweets';
import { Link, withRouter } from 'react-router-dom';


const Tweet = (props) => {
  const { text, author, authorAvatar, timestamp, liked, likes, replies, replyingTo, replyingToID, toggleLike, id, history } = props;
  const filled = { color: 'rgb(224, 36, 94)' };
  const handleClick = (e) => {
    const svg  = e.target.closest('svg');
    const span = e.target.closest('span');
    // Only stop ordinary execution if the element is not null & is the heart svg or replying-to span respectively
    if(svg && svg.getAttribute('class').includes('heart')) {
      e.preventDefault();
      toggleLike(id, liked) 
    } else if(span && span.className === 'replying-to') {
      e.preventDefault();
      // Using react router here to redirect because nested anchor tags are not allowed in the mark-up.
      history.push(`/tweet/${ replyingToID }`);
    } 
  }

  return (
    <Link to={ linkPath(id) } className='tweet' onClick={ (e) => handleClick(e) } >
      <img className='avatar' src={ authorAvatar } alt={ author } />
      <div className="tweet-info">
        <div className='author'>{ author }</div>
        <div className='timestamp'>{ timestamp }</div>
        {replyingTo !== null 
          && <span className='replying-to'>
                Replying To @{ replyingTo }
            </span>}
        <p>{ text }</p>
        <div className="tweet-icons">
          <TiArrowBackOutline className='tweet-icon' /> <span className='buffer' /> { replies > 0 && replies }
          <span className='spacer' />
          {liked 
            ? <TiHeartFullOutline style={ filled } className='tweet-icon heart' /> 
            : <TiHeartOutline className='tweet-icon heart' />} 
          <span className='buffer' /> { likes > 0 && likes }
        </div>
      </div>
    </Link>
  )
}

// use deadlink if already on tweet or new-tweet path
const linkPath = (id) => {
  return window.location.href.includes('tweet')
    ? '#'
    : `tweet/${ id }`;
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
    replyingTo: replyingTo === null ? null : tweets[replyingTo].author,
    replyingToID: replyingTo
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleLike(id, liked) {
    dispatch(handleLikeTweet({
      id,
      hasLiked: liked
    }));
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tweet));