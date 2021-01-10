import {
  AUTHORIZE_ATTEMPT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_USER_SUCCESS,
  LOGOUT,
} from '../actions/action-types.js';

const user = JSON.parse(window.localStorage.getItem('user'));

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHORIZE_ATTEMPT:
      if (window.localStorage.getItem('user')) {
        return {
          isLoggedIn: true,
          user: window.localStorage.getItem('user'),
        };
      } else {
        return {
          isLoggedIn: false,
          user: null,
        };
      }
    case REGISTER_SUCCESS:
      return {
        isLoggedIn: true,
        user: payload.user,
      };
    case REGISTER_FAIL:
      return {
        isLoggedIn: false,
        user: null,
      };
    case UPDATE_USER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
export default auth;
