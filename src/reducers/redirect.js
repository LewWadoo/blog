import {
  NEED_REDIRECT,
  CLEAR_REDIRECT,
  DELETE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_ARTICLE_SUCCESS,
  REGISTER_SUCCESS,
} from '../actions/action-types.js';

const initialState = false;

function redirect(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case CREATE_ARTICLE_SUCCESS:
    case UPDATE_ARTICLE_SUCCESS:
    case DELETE_ARTICLE_SUCCESS:
    case NEED_REDIRECT:
    case UPDATE_USER_SUCCESS:
    case REGISTER_SUCCESS:
      return true;
    case CLEAR_REDIRECT:
      return false;

    default:
      return state;
  }
}

export default redirect;
