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

export function create(post) {
    return {
        type: types.posts.CREATE,
        error: false,
        post
    };
}

export function like(postId) {
    return {
        type: types.posts.LIKE,
        error: false,
        postId
    };
}

export function unlike(postId) {
    return {
        type: types.posts.UNLIKE,
        error: false,
        postId
    };
}

export function createNewPost(post) {
    return (dispatch, getState) => {
        const { user } = getState();
        post.userId = user.id;
        post.date = new Date().toUTCString();
        dispatch(loading());
        return createPost(post)
            .then(res => res.json())
            .then(() => {
                post.user = user;
                dispatch(create(post));
            })
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
