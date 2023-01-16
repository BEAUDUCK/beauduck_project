import { handleActions } from 'redux-actions';
import * as membersAPI from '../api/member';
// import createRequestThunk from './createRequestThunk';

// Action
const GET_MEMBERS = 'member/GET_MEMBER';
const GET_MEMBERS_SUCCESS = 'member/GET_MEMBER_SUCCESS';
const GET_MEMBERS_FAILURE = 'member/GET_MEMBER_FAILURE';

// Middleware == dispatch(action)
export const getMember = () => async (dispatch) => {
  dispatch({ type: GET_MEMBERS });
  try {
    const members = await membersAPI.getMembersAxios();
    dispatch({ type: GET_MEMBERS_SUCCESS, members });
  } catch (e) {
    dispatch({ type: GET_MEMBERS_FAILURE, error: e });
  }
};

const initialState = {
  members: [],
};

// Reducer
const members = handleActions(
  {
    [GET_MEMBERS]: (state) => ({
      ...state,
    }),
    [GET_MEMBERS_SUCCESS]: (state, action) => ({
      ...state,
      members: action.members,
    }),
  },
  initialState,
);

export default members;
