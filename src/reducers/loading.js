import {
  SET_LOADING,
  CLEAR_LOADING,
  FETCH_ARTICLES_LIST_SUCCESS,
  FETCH_ARTICLES_LIST_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_REQUEST,
} from '../actions/action-types.js';

const initialState = false;

function loading(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case FETCH_ARTICLES_LIST_REQUEST:
    case FETCH_ARTICLE_REQUEST:
    case SET_LOADING:
      return true;
    case FETCH_ARTICLES_LIST_SUCCESS:
    case FETCH_ARTICLE_SUCCESS:
    case CLEAR_LOADING:
      return false;

    default:
      return state;
  }
}

export default loading;
