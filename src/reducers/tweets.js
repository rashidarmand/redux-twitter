import { RECEIVE_TWEETS, LIKE_TWEET, ADD_TWEET } from '../actions/tweets';

export default function tweets(state = {}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS :
      return {
        ...state,
        ...action.tweets
      }

    case LIKE_TWEET :
      const { id, hasLiked, authedUser } = action;

      return {
        ...state,
        [id]: {
          ...state[id],
          likes: hasLiked === true
            ? state[id].likes.filter((uid) => uid !== authedUser)
            : state[id].likes.concat([ authedUser ])
        }
      }

    case ADD_TWEET :
      const { tweet, parentTweet } = action;

      return parentTweet === null
        ? {
            ...state,
            [tweet.id]: tweet
          }
        : {
            ...state,
            [tweet.id]: tweet,
            [parentTweet]: {
              ...state[parentTweet],
              replies: state[parentTweet].replies.concat([ tweet.id ])
            }
          }

    default :
      return state;
  }
}