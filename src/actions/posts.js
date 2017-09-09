import parseLinkHeader from 'parse-link-header';

import * as types from '../constants/types';
import { createPost, fetchPosts, fetchPost } from '../shared/http';
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
        return createPost(post)
            .then(res => res.json())
            .then(newPost => dispatch(loadPost(newPost.id)))
            .then(post => dispatch(create(post)))
            .catch(err => console.error(err));
    };
}

export function getPostsForPage(page = 'first') {
    return (dispatch, getState) => {
        const { pagination } = getState();
        const endpoint = pagination[page];
        return fetchPosts(endpoint).then(res => {
            const links = parseLinkHeader(res.headers.get('Link'));
            return res.json().then(posts => {
                dispatch(updateLinks(links));
                dispatch(updateAvailablePosts(posts));
            });
        });
    };
}

export function loadPost(postId) {
    return dispatch => {
        return fetchPost(postId)
            .then(res => res.json())
            .then(post => {
                dispatch(updateAvailablePosts([post]));
                dispatch(getCommentsForPost(postId));
            });
    };
}
