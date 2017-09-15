import parseLinkHeader from 'parse-link-header';

import * as types from '../constants/types';
import * as API from '../shared/http';
import { createError } from './error';
import { getCommentsForPost } from './comments';

/**
 * Updates available posts
 * @method updateAvailablePosts
 * @module letters/actions
 * @param  {Array<Post>}             posts array of incoming posts
 * @return {object}
 */
export function updateAvailablePosts(posts) {
    return {
        type: types.posts.GET,
        posts
    };
}

/**
 * Updates links used for pagination
 * @method updatePaginationLinks
 * @module letters/actions
 * @param  {object}              links parsed link headers
 * @return {object}
 */
export function updatePaginationLinks(links) {
    return {
        type: types.posts.UPDATE_LINKS,
        links
    };
}

/**
 * Likes a post
 * @method like
 * @module letters/actions
 * @param  {string} postId post id to like
 * @return {object}
 */
export function like(postId) {
    return (dispatch, getState) => {
        const { user } = getState();
        return API.likePost(postId, user.id)
            .then(res => res.json())
            .then(post => {
                dispatch({
                    type: types.posts.LIKE,
                    post
                });
            });
    };
}

/**
 * Unlike a post
 * @method unlike
 * @module letters/actions
 * @param  {string} postId post id to unlike
 * @return {object}
 */
export function unlike(postId) {
    return (dispatch, getState) => {
        const { user } = getState();
        return API.unlikePost(postId, user.id)
            .then(res => res.json())
            .then(post => {
                dispatch({
                    type: types.posts.UNLIKE,
                    post
                });
            });
    };
}

/**
 * Create a new post
 * @method createNewPost
 * @module letters/actions
 * @param  {object}      post post payload
 * @return {object}
 */
export function createNewPost(post) {
    return (dispatch, getState) => {
        const { user } = getState();
        post.userId = user.id;
        return API.createPost(post)
            .then(res => res.json())
            .then(newPost => {
                dispatch({
                    type: types.posts.CREATE,
                    post: newPost
                });
            })
            .catch(err => dispatch(createError(err)));
    };
}

/**
 * Get posts for a given page ['first', 'prev', 'next']
 * @method getPostsForPage
 * @module letters/actions
 * @param  {string}        [page='first'] page type to get
 * @return {object}
 */
export function getPostsForPage(page = 'first') {
    return (dispatch, getState) => {
        const { pagination } = getState();
        const endpoint = pagination[page];
        return API.fetchPosts(endpoint)
            .then(res => {
                const links = parseLinkHeader(res.headers.get('Link'));
                return res.json().then(posts => {
                    dispatch(updatePaginationLinks(links));
                    dispatch(updateAvailablePosts(posts));
                });
            })
            .catch(err => dispatch(createError(err)));
    };
}

/**
 * Load a given post
 * @method loadPost
 * @module letters/actions
 * @param  {string} postId post id to load
 * @return {object}
 */
export function loadPost(postId) {
    return dispatch => {
        return API.fetchPost(postId)
            .then(res => res.json())
            .then(post => {
                dispatch(updateAvailablePosts([post]));
                dispatch(getCommentsForPost(postId));
            })
            .catch(err => dispatch(createError(err)));
    };
}
