import { saveLikeToggle } from '../utils/api';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const LIKE_TWEET = 'LIKE_TWEET';

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

function likeTweet({ id, hasLiked, authedUser}) {
  return {
    type: LIKE_TWEET,
    id,
    hasLiked,
    authedUser
  }
}

export function handleLikeTweet(tweetInfo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    tweetInfo.authedUser = authedUser;
    
    saveLikeToggle(tweetInfo)
      .then(() => dispatch(likeTweet(tweetInfo)))
  }
}