import { RECEIVE_USERS } from '../actions/users';
import { ADD_TWEET } from '../actions/tweets';
import { formatTweet } from '../utils/helpers';


export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }

    case ADD_TWEET :
      const { text, author, replyingTo } = action;
      const formattedTweet = formatTweet({
        text,
        author,
        replyingTo
      })

      return {
        ...state,
        [author]: {
          ...state[author],
          tweets: state[author].tweets.concat([formattedTweet.id])
        }
      }

    default : 
      return state;
  }
}