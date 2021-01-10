import { SET_ERRORS, CLEAR_ERRORS } from '../actions/action-types.js';

const initialState = '';

function errors(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ERRORS:
      return payload;
    case CLEAR_ERRORS:
      return '';

    default:
      return state;
  }
}

export default errors;
