import {
  SET_MESSAGE,
  FETCH_ARTICLES_LIST_REQUEST,
  FETCH_ARTICLES_LIST_SUCCESS,
  FETCH_ARTICLES_LIST_FAIL,
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAIL,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAIL,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAIL,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAIL,
  LIKE_ARTICLE_SUCCESS,
  LIKE_ARTICLE_FAIL,
  UNLIKE_ARTICLE_SUCCESS,
  UNLIKE_ARTICLE_FAIL,
} from './action-types.js';

import BlogService from '../services/blog-service';
const blogService = new BlogService();

export function fetchArticlesList(page, size) {
  return function (dispatch) {
    dispatch({ type: FETCH_ARTICLES_LIST_REQUEST });
    return blogService
      .fetchArticlesList(page, size)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          dispatch({
            type: FETCH_ARTICLES_LIST_FAIL,
            payload: response.status,
          });

          return Promise.reject(response.status);
        }
      })
      .then((result) => {
        dispatch({
          type: FETCH_ARTICLES_LIST_SUCCESS,
          payload: result,
        });
        return result;
      })
      .catch((error) => {
        const message =
          (error && error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: FETCH_ARTICLES_LIST_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
}

export function fetchArticle(slug) {
  return function (dispatch) {
    dispatch({ type: FETCH_ARTICLE_REQUEST });
    return blogService
      .fetchArticle(slug)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          dispatch({
            type: FETCH_ARTICLE_FAIL,
            payload: response.status,
          });

          return Promise.reject(response.status);
        }
      })
      .then((result) => {
        dispatch({
          type: FETCH_ARTICLE_SUCCESS,
          payload: result,
        });
        return result;
      })
      .catch((error) => {
        dispatch({
          type: FETCH_ARTICLE_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: error,
        });
      })
      .catch((error) => {
        const message =
          (error && error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: FETCH_ARTICLE_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
}

export function unfavoriteArticle(token, slug) {
  return function (dispatch) {
    return blogService
      .unfavoriteArticle(token, slug)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          dispatch({
            type: UNLIKE_ARTICLE_FAIL,
          });

          return Promise.reject(response.status);
        }
      })
      .then((result) => {
        dispatch({
          type: UNLIKE_ARTICLE_SUCCESS,
          payload: result,
        });
        return result;
      })
      .catch((error) => {
        dispatch({
          type: UNLIKE_ARTICLE_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: error.toString(),
        });
      });
  };
}

export function favoriteArticle(token, slug) {
  return function (dispatch) {
    return blogService
      .favoriteArticle(token, slug)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          dispatch({
            type: LIKE_ARTICLE_FAIL,
          });

          return Promise.reject(response.status);
        }
      })
      .then((result) => {
        dispatch({
          type: LIKE_ARTICLE_SUCCESS,
          payload: result,
        });
        return result;
      })
      .catch((error) => {
        dispatch({
          type: LIKE_ARTICLE_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: error.toString(),
        });
      });
  };
}

export function deleteArticle(token, slug) {
  return function (dispatch) {
    return blogService
      .deleteArticle(token, slug)
      .then((response) => {
        if (response.ok) {
          dispatch({
            type: DELETE_ARTICLE_SUCCESS,
          });
        } else {
          dispatch({
            type: DELETE_ARTICLE_FAIL,
            payload: response.status,
          });
        }
      })
      .catch((error) => {
        const message =
          (error && error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: DELETE_ARTICLE_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      });
  };
}

export const createArticle = (token, title, description, body, tagList = []) => (dispatch) => {
  return blogService
    .createArticle(token, title, description, body, tagList)
    .then((response) => {
      return response.json();
    })
    .then(
      (result) => {
        const { errors } = result;
        if (errors) {
          dispatch({
            type: CREATE_ARTICLE_FAIL,
          });
          dispatch({
            type: SET_MESSAGE,
            payload: errors.toString(),
          });
        } else {
          dispatch({
            type: CREATE_ARTICLE_SUCCESS,
            payload: result,
          });
        }
      },
      (error) => {
        const message =
          (error && error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: CREATE_ARTICLE_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      },
    );
};

export const updateArticle = (token, title, description, body, tagList = [], slug) => (
  dispatch,
) => {
  return blogService
    .updateArticle(token, title, description, body, tagList, slug)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const { error } = result;
      if (error) {
        dispatch({
          type: UPDATE_ARTICLE_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: error.toString(),
        });
      } else {
        dispatch({
          type: UPDATE_ARTICLE_SUCCESS,
          payload: result,
        });
      }
    })
    .catch((error) => {
      const message =
        (error && error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_ARTICLE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    });
};
