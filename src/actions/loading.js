import * as types from '../constants/types';

export function loading() {
  return {
    type: types.working.LOADING
  };
}

export function loaded() {
  return {
    type: types.working.LOADED
  };
}
