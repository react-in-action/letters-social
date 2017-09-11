import * as types from '../constants/types';
import * as API from '../shared/http';

export function showComments(postId) {
    return {
        type: types.comments.SHOW,
        error: null,
        postId
    };
}

export function toggleComments(postId) {
    return {
        type: types.comments.TOGGLE,
        error: null,
        postId
    };
}

export function updateAvailableComments(comments) {
    return {
        type: types.comments.GET,
        error: null,
        comments
    };
}

export function createComment(payload) {
    return dispatch => {
        return API.createComment(payload)
            .then(res => res.json())
            .then(comment => {
                dispatch({
                    type: types.comments.CREATE,
                    error: null,
                    comment
                });
            });
    };
}

export function getCommentsForPost(postId) {
    return dispatch => {
        return API.fetchCommentsForPost(postId)
            .then(res => res.json())
            .then(comments => {
                dispatch(updateAvailableComments(comments));
            });
    };
}
