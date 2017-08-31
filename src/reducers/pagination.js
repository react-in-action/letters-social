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
export function pagination(state = initialState.pagination, action) {
    switch (action.type) {
        case types.posts.UPDATE_LINKS:
            return action.links;
        case types.app.LOADED:
            return false;
        default:
            return state;
    }
}
