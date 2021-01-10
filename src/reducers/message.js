import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/action-types.js';

const initialState = '';

function message(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return payload;
    case CLEAR_MESSAGE:
      return '';

    default:
      return state;
  }
}

export default message;
