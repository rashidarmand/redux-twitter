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

function addTweet(formattedTweet) {
  return {
    type: ADD_TWEET,
    tweet: formattedTweet,
    author: formattedTweet.author,
    parentTweet: formattedTweet.replyingTo
  }
}

export function handleAddTweet(newTweet) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    saveTweet(newTweet)
      .then((formattedTweet) => {
        formattedTweet.authedUser = authedUser;
        dispatch(addTweet(formattedTweet))
      })
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