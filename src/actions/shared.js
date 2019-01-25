import { getInitialData } from '../utils/api';
import { setAuthedUser } from './authedUser';
import { receiveTweets } from './tweets';
import { receiveUsers } from './users';

const AUTHED_ID = 'dan_abramov';

export default function handleGetInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, tweets }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveTweets(tweets));
        dispatch(setAuthedUser(AUTHED_ID));
      })
  }
}