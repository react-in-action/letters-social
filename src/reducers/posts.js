import { keyBy } from 'lodash';

import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function posts(state = initialState.posts, action) {
    switch (action.type) {
        case types.posts.UPDATE: {
            return Object.assign({}, state.posts, keyBy(action.posts, 'id'));
        }
        default:
            return state;
    }
}

export function postIds(state = initialState.postIds, action) {
    switch (action.type) {
        case types.posts.UPDATE: {
            const nextPostIds = action.posts.map(post => post.id).concat(state.postIds);
            return nextPostIds;
        }
        default:
            return state;
    }
}
