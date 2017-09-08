import initialState from '../constants/initialState';
import * as types from '../constants/types';

// TODO: ADD THIS TO CHAPTER 8

/**
 * The comments reducer is responsible for controlling comments
 * @method comments
 * @module letters/reducers
 * @param  {object} [state=initialState.user] object
 * @param  {object} action                    Redux action
 * @return {object}                           next state
 */
export function comments(state = initialState.comments, action) {
    switch (action.type) {
        case types.comments.GET: {
            // TODO: update chapters with this state in mind
            const { comments } = action;
            // Make a copy of the old state
            let newState = Object.assign({}, state);
            // For each of our incoming comments, see if we have them in our map yet or not;
            // if they are missing, add them in. JS Maps can be read out in insertion order,
            // so we should still get comments in the order that we got them back from the API in
            for (let comment of comments) {
                if (!newState[comment.id]) {
                    newState[comment.id] = comment;
                }
            }
            return newState;
        }
        default:
            return state;
    }
}

/**
 * The commentIds reducer is where we keep track of the ids of comments; this way, we can denormalize our data
 * and treat state more like a database. This way, all we need to do is look things up by ID and leave the
 * rest of the logic to the comments reducer. This allows for better separation of concerns, although different
 * situations lead to you take a different approach
 * @method commentIds
 * @module letters/reducers
 * @param  {Set} [state=initialState.commentIds] intial or previous state
 * @param  {object} action                       Redux action
 * @return {object}                              next state for slice
 */
export function commentIds(state = initialState.commentIds, action) {
    switch (action.type) {
        case types.comments.GET: {
            const nextCommentIds = action.comments.map(comment => comment.id);
            let nextState = Array.from(state);
            for (let commentId of nextCommentIds) {
                if (!state.includes(commentId)) {
                    nextState.push(commentId);
                }
            }
            return nextState;
        }
        default:
            return state;
    }
}
