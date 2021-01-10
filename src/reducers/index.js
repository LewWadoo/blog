import { combineReducers } from 'redux';

import auth from './auth';
import message from './message';
import errors from './errors';
import articles from './articles';
import article from './article';
import loading from './loading';
import redirect from './redirect';

const reducer = combineReducers({
  article,
  articles,
  auth,
  message,
  errors,
  loading,
  redirect,
});

export const getAuth = (state) => state.auth;
export const getMessage = (state) => state.message;
export const getErrors = (state) => state.errors;
export const getArticles = (state) => state.articles;
export const getArticle = (state) => state.article;
export const getLoading = (state) => state.loading;
export const getRedirect = (state) => state.redirect;

export default reducer;
