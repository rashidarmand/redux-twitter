import { saveLikeToggle, saveTweet } from '../utils/api';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const LIKE_TWEET = 'LIKE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';


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

function addTweet({ text, author, replyingTo }) {
  return {
    type: ADD_TWEET,
    text,
    author,
    replyingTo
  }
}

export function handleAddTweet(newTweet) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    newTweet.author = authedUser;

    saveTweet(newTweet)
      .then(() => dispatch(addTweet(newTweet)))
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