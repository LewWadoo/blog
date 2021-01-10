import {
  FETCH_ARTICLES_LIST_REQUEST,
  FETCH_ARTICLES_LIST_SUCCESS,
  FETCH_ARTICLES_LIST_FAIL,
  LIKE_ARTICLE_SUCCESS,
  UNLIKE_ARTICLE_SUCCESS,
} from '../actions/action-types.js';

const initialState = {};

const articles = (state = initialState, action) => {
  const findIndex = (slug) => {
    return state.articles.findIndex((article) => article.slug === slug);
  };

  const { type, payload } = action;
  switch (type) {
    case FETCH_ARTICLES_LIST_SUCCESS:
      return payload;
    case FETCH_ARTICLES_LIST_REQUEST:
    case FETCH_ARTICLES_LIST_FAIL:
      return {};
    case LIKE_ARTICLE_SUCCESS:
    case UNLIKE_ARTICLE_SUCCESS:
      const articleIndex = findIndex(payload.article.slug);
      if (articleIndex > -1) {
        return {
          ...state,
          articles: [
            ...state.articles.slice(0, articleIndex),
            payload.article,
            ...state.articles.slice(articleIndex + 1),
          ],
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default articles;
