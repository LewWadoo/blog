import { combineReducers } from 'redux';

import { sort } from './sort';
import { transfers } from './transfers';
import { searchId } from './search-id';
import { isLoading } from './is-loading';
import { tickets } from './tickets';
import { stop } from './stop';
import { error } from './error';

const reducer = combineReducers({
  sort,
  transfers,
  searchId,
  isLoading,
  error,
  tickets,
  stop,
});

export const getSort = (state) => state.sort;
export const getTransfers = (state) => state.transfers;
export const getSearchId = (state) => state.searchId;
export const getTickets = (state) => state.tickets;
export const getError = (state) => state.error;
export const getStop = (state) => state.stop;
export const getLoadingState = (state) => state.isLoading;

export default reducer;
