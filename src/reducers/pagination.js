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
            const nextState = Object.assign({}, state);
            for (let k in action.links) {
                if (action.links.hasOwnProperty(k)) {
                    // NOTE: this is due to how json-server works w/ the current deploy setup we have
                    // Because the frontend of the system terminates SSL, the links that come back
                    // from the server have the http protocol set and not https. We only serve http2
                    // so https is required. This is *not* specific to React, just how the app is currently
                    // deployed 
                    if (process.env.NODE_ENV === 'production') {
                        nextState[k] = action.links[k].url.replace(/http:\/\//, 'https://');
                    } else {
                        nextState[k] = action.links[k].url;
                    }
                }
            }
            return nextState;
        default:
            return state;
    }
}
