import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function loading(state = initialState.loading, action) {
  switch (action.type) {
    case types.app.LOADING:
      return Object.assign({}, state, { loading: true });
    case types.app.LOADED:
      return Object.assign({}, state, { loading: false });
    default:
      return state;
  }}
