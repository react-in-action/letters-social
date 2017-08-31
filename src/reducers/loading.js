import initialState from '../constants/initialState';
import * as types from '../constants/types';

/**
 * The loading reducer controls the global loading state
 * @method loading
 * @module letters/reducers
 * @param  {boolean} [state=initialState.loading] prev/initial state
 * @param  {object} action                       Redux action
 * @return {object}                              next state
 */
export function loading(state = initialState.loading, action) {
    switch (action.type) {
        case types.app.LOADING:
            return true;
        case types.app.LOADED:
            return false;
        default:
            return state;
    }
}
