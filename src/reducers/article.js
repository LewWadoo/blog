import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAIL,
  DELETE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_SUCCESS,
  LIKE_ARTICLE_SUCCESS,
  UNLIKE_ARTICLE_SUCCESS,
  CLEAR_ARTICLE,
} from '../actions/action-types.js';

const initialState = null;

const article = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ARTICLE_SUCCESS:
    case CREATE_ARTICLE_SUCCESS:
    case UPDATE_ARTICLE_SUCCESS:
    case LIKE_ARTICLE_SUCCESS:
    case UNLIKE_ARTICLE_SUCCESS:
      return payload.article;
    case FETCH_ARTICLE_REQUEST:
    case FETCH_ARTICLE_FAIL:
    case DELETE_ARTICLE_SUCCESS:
    case CREATE_ARTICLE_FAIL:
    case CLEAR_ARTICLE:
      return null;
    default:
      return state;
  }
};
export default article;
