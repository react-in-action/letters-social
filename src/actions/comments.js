import * as types from '../constants/types';
import { createComment, fetchCommentsForPost } from '../shared/http';

export function showComments(postId) {
    return {
        type: types.comments.SHOW,
        error: false,
        postId
    };
}

export function toggleComments(postId) {
    return {
        type: types.comments.TOGGLE,
        error: false,
        postId
    };
}

export function updateAvailableComments(comments) {
    return {
        type: types.comments.GET,
        error: false,
        comments
    };
}

export function getCommentsForPost(postId) {
    return dispatch => {
        return fetchCommentsForPost(postId)
            .then(res => res.json())
            .then(comments => {
                dispatch(updateAvailableComments(comments));
            });
    };
}
