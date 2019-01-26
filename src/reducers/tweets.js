import { RECEIVE_TWEETS, LIKE_TWEET } from '../actions/tweets';

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
    default :
      return state;
  }
}