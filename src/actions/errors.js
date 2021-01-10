import { SET_ERRORS, CLEAR_ERRORS } from './action-types.js';

export const setErrors = (errors) => ({
  type: SET_ERRORS,
  payload: errors,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
