import users from './users';
import tweets from './tweets';
import authedUser from './authedUser'
import { combineReducers } from 'redux';

export default combineReducers({
  users,
  tweets,
  authedUser
})