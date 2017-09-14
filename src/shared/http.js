import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';

/**
 * Generates a Fetch confiugration object so we can share headers
 * @method generateFetchConfig
 * @module letters/shared/http
 * @param  {string}            method      HTTP verb
 * @param  {object}            [body=null] payload for post/put
 * @return {object}                        config
 */
function generateFetchConfig(method, body = null) {
    const upCasedMethod = method.toUpperCase();
    const token = Cookies.get('letters-token');
    const config = {
        method: upCasedMethod,
        headers: {
            'Content-Type': 'application/json',
            'Letters-Token': token
        },
        credentials: 'same-origin'
    };
    if (['POST', 'PUT'].includes(upCasedMethod)) {
        config.body = JSON.stringify(body);
    }
    return config;
}

/**
 * Creates a post with the given payload
 * @method createPost
 * @module letters/shared/http
 * @param  {object}   payload Post payload
 * @return {Response}           Fetch Response
 */
export function createPost(payload) {
    // Send the new post to the API
    return fetch(`${process.env.ENDPOINT}/posts`, generateFetchConfig('POST', payload));
}

/**
 * Fetch posts from the API
 * @module letters/shared/http
 * @method fetchPosts
 * @param  {string}   endpoint URL provided by Redux; the API will yield further endpoints we can access via the Link Header (https://www.w3.org/wiki/LinkHeader)
 * @return {Response}          Fetch API Response
 */
export function fetchPosts(endpoint) {
    return fetch(endpoint);
}

/**
 * Fetch a post from the API
 * @module letters/shared/http
 * @method fetchPost
 * @param  {string}  id post ID
 * @return {Response}     Fetch Response object
 */
export function fetchPost(id) {
    return fetch(
        `${process.env.ENDPOINT}/posts/${id}?_embed=comments&_expand=user&_embed=likes`,
        generateFetchConfig('GET')
    );
}

/**
 * Fetch a post from the API
 * @module letters/shared/http
 * @method fetchCommentsForPost
 * @param  {string}  id post ID/
 * @return {Response}     Fetch Response object
 */
export function fetchCommentsForPost(postId) {
    return fetch(`${process.env.ENDPOINT}/comments?postId=${postId}&_expand=user`, generateFetchConfig('GET'));
}

/**
 * Creates a post with the given payload
 * @method createComment
 * @module letters/shared/http
 * @param  {object}   payload Post payload
 * @return {Response}           Fetch Response
 */
export function createComment(payload) {
    // Send the new post to the API
    return fetch(`${process.env.ENDPOINT}/comments`, generateFetchConfig('POST', payload));
}

/**
 * Like a post
 * @method likePost
 * @module letters/shared/http
 * @param  {string} postId post's ID
 * @param  {string} userId user's ID
 * @return {Response}        Fetch Response
 */
export function likePost(postId, userId) {
    // Create a new like for the user/post
    return fetch(
        `${process.env.ENDPOINT}/posts/${postId}/likes/${userId}`,
        generateFetchConfig('PUT', { postId, userId })
    );
}

/**
 * Unlikes a post for a given user
 * @method unlikePost
 * @module letters/shared/http
 * @param  {string}   postId
 * @param  {string}   userId
 * @return {Response}
 */
export function unlikePost(postId, userId) {
    return fetch(`${process.env.ENDPOINT}/posts/${postId}/likes/${userId}`, generateFetchConfig('DELETE'));
}

/**
 * Fetch a user from the API
 * @module letters/shared/http
 * @method loadUser
 * @param  {string}  id post ID
 * @return {Response}     Fetch Response object
 */
export function loadUser(id) {
    return fetch(`${process.env.ENDPOINT}/users/${id}`, generateFetchConfig('GET')).then(res => res.json());
}
