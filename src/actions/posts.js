import uuid from 'uuid/v4';
import parseLinkHeader from 'parse-link-header';

import * as types from '../constants/types';
import { createPost, fetchPosts, fetchPost } from '../shared/http';
import { loading, loaded } from './loading';
import { getCommentsForPost, updateAvailableComments } from './comments';

export function updateAvailablePosts(posts) {
    return {
        type: types.posts.GET,
        error: false,
        posts
    };
}

export function updateLinks(links) {
    return {
        type: types.posts.UPDATE_LINKS,
        error: false,
        links
    };
}

export function createNewPost(payload) {
    payload.id = uuid();
    return dispatch => {
        dispatch(loading());
        return createPost(payload)
            .then(() => dispatch(getPostsForPage()))
            .catch(err => console.error(err));
    };
}

export function getPostsForPage(page = 'first') {
    return (dispatch, getState) => {
        const state = getState();
        const endpoint = state.pagination[page];
        dispatch(loading());
        return fetchPosts(endpoint).then(res => {
            const links = parseLinkHeader(res.headers.get('Link'));
            return res.json().then(posts => {
                dispatch(updateLinks(links));
                dispatch(updateAvailablePosts(posts));
                dispatch(loaded());
            });
        });
    };
}

export function loadPost(postId) {
    return dispatch => {
        dispatch(loading());
        return fetchPost(postId)
            .then(res => res.json())
            .then(post => {
                console.log(post);
                dispatch(updateAvailablePosts([post]));
                dispatch(getCommentsForPost(postId));
                dispatch(loaded());
            });
    };
}
