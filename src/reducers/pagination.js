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
            const newState = Object.assign({}, state);
            for (let k in action.links) {
                if (action.links.hasOwnProperty(k)) {
                    newState[k] = action.links[k].url;
                }
            }
            return newState;
        default:
            return state;
    }
}
