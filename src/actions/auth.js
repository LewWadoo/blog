import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  LOGOUT,
  SET_MESSAGE,
  SET_ERRORS,
} from './action-types.js';

import AuthService from '../services/auth-service';
const authService = new AuthService();

export const signUp = (username, email, password) => (dispatch) => {
  return authService
    .signUp(username, email, password)
    .then((response) => {
      return response.json();
    })
    .then(
      (result) => {
        const { errors } = result;
        if (errors) {
          dispatch({
            type: REGISTER_FAIL,
          });
          dispatch({
            type: SET_ERRORS,
            payload: errors,
          });
        } else {
          dispatch({
            type: REGISTER_SUCCESS,
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
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      },
    );
};

export const signIn = (email, password) => (dispatch) => {
  return authService
    .signIn(email, password)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const { errors } = result;
      if (errors) {
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_ERRORS,
          payload: errors,
        });
      } else {
        window.localStorage.setItem('user', JSON.stringify(result.user));
        dispatch({
          type: LOGIN_SUCCESS,
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
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    });
};

export const logout = () => (dispatch) => {
  authService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const authorize = (token) => (dispatch) => {
  return authService
    .authorize(token)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: response.status,
        });
        return Promise.reject(response.status);
      }
    })
    .then((result) => {
      const { errors } = result;
      if (errors) {
        dispatch({
          type: LOGIN_FAIL,
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
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
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    });
};

export const updateUser = (token, image, username, email, password) => (dispatch) => {
  return authService
    .updateUser(token, image, username, email, password)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const { errors } = result;
      if (errors) {
        dispatch({
          type: UPDATE_USER_FAIL,
        });
        dispatch({
          type: SET_ERRORS,
          payload: errors,
        });
      } else {
        window.localStorage.setItem('user', JSON.stringify(result));
        dispatch({
          type: UPDATE_USER_SUCCESS,
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
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    });
};
