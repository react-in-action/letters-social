import initialState from '../constants/initialState';
import * as types from '../constants/types';

/**
 * The posts reducer controls the state of the actual post objects. We are storing them here in a
 * Map because that data structure is well-suited to shallow key-value lookup with preserved insertion order
 * @method posts
 * @module letters/reducers
 * @param  {Map} [state=initialState.posts] initial state of the reducer
 * @param  {object} action                     Redux action
 * @return {object}                            next state for slice
 */
export function posts(state = initialState.posts, action) {
    switch (action.type) {
        case types.posts.NEXT: {
            // TODO: update chapters with this state in mind
            const { posts } = action;
            // Make a copy of the old state
            let newState = new Map(state.posts);
            // For each of our incoming posts, see if we have them in our map yet or not;
            // if they are missing, add them in. JS Maps can be read out in insertion order,
            // so we should still get posts in the order that we got them back from the API in
            for (let post of posts) {
                if (!newState.has(post)) {
                    newState.set(post.id, post);
                }
            }
            return newState;
        }
        case types.posts.UPDATE_LINKS: {
            return Object.assign({}, state.pagination, action.links);
        }
        default:
            return state;
    }
}

/**
 * The postIds reducer is where we keep track of the ids of posts; this way, we can denormalize our data
 * and treat state more like a database. This way, all we need to do is look things up by ID and leave the
 * rest of the logic to the posts reducer. This allows for better separation of concerns, although different
 * situations lead to you take a different approach
 * @method postIds
 * @module letters/reducers
 * @param  {Set} [state=initialState.postIds] intial or previous state
 * @param  {object} action                       Redux action
 * @return {object}                              next state for slice
 */
export function postIds(state = initialState.postIds, action) {
    switch (action.type) {
        case types.posts.NEXT: {
            const nextPostIds = action.posts.map(post => post.id);
            // Iterate over the posts and add the IDs to our set
            for (let postID of posts) {
                // If we don't already have the post, add it to the set
                if (!state.has(postID)) {
                    state.postIds.add(postID);
                }
            }
            return nextPostIds;
        }
        default:
            return state;
    }
}
