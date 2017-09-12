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
        case types.posts.GET: {
            const { posts } = action;
            // Make a copy of the old state
            let nextState = Object.assign({}, state);
            // For each of our incoming posts, see if we have them in our map yet or not;
            // if they are missing, add them in. JS Maps can be read out in insertion order,
            // so we should still get posts in the order that we got them back from the API in
            for (let post of posts) {
                if (!nextState[post.id]) {
                    nextState[post.id] = post;
                }
            }
            return nextState;
        }
        case types.posts.CREATE: {
            const { post } = action;
            let nextState = Object.assign({}, state);
            if (!nextState[post.id]) {
                nextState[post.id] = post;
            }
            return nextState;
        }
        case types.comments.SHOW: {
            let nextState = Object.assign({}, state);
            nextState[action.postId].showComments = true;
            return nextState;
        }
        case types.comments.TOGGLE: {
            let nextState = Object.assign({}, state);
            nextState[action.postId].showComments = !nextState[action.postId].showComments;
            return nextState;
        }
        // For like/unlike, we just need to update the individual post with the response we
        // get back from the server
        case types.posts.LIKE: {
            let nextState = Object.assign({}, state);
            const oldPost = nextState[action.post.id];
            nextState[action.post.id] = Object.assign({}, oldPost, action.post);
            return nextState;
        }
        case types.posts.UNLIKE: {
            let nextState = Object.assign({}, state);
            const oldPost = nextState[action.post.id];
            nextState[action.post.id] = Object.assign({}, oldPost, action.post);
            return nextState;
        }
        case types.comments.CREATE: {
            const { comment } = action;
            let nextState = Object.assign({}, state);
            nextState[comment.postId].comments.push(comment);
            return state;
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
        case types.posts.GET: {
            const nextPostIds = action.posts.map(post => post.id);
            let nextState = Array.from(state);
            for (let post of nextPostIds) {
                if (!state.includes(post)) {
                    nextState.push(post);
                }
            }
            return nextState;
        }
        // When we create a new post, insert it into the collection of post IDs that we already have
        case types.posts.CREATE: {
            const { post } = action;
            // Make a copy of previous state
            // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
            let nextState = Array.from(state);
            if (!state.includes(post.id)) {
                nextState.push(post.id);
            }
            return nextState;
        }
        default:
            return state;
    }
}
