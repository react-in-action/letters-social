import fetch from 'isomorphic-fetch';

/**
 * Creates a post with the given payload
 * @method createPost
 * @module letters/shared/http
 * @param  {object}   payload Post payload
 * @return {Response}           Fetch Response
 */
export function createPost(payload) {
    if (!payload) {
        throw new Error('You must provide a payload when creating a new post');
    }
    // Create options for the request
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // Send the new post to the API
    return fetch(
        `${process.env.ENDPOINT}/posts?_embed=comments&_expand=user&_embed=likes`,
        requestOptions
    );
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
    return fetch(`${process.env.ENDPOINT}/posts/${id}?_embed=comments&_expand=user&_embed=likes`);
}

/**
 * Fetch a post from the API
 * @module letters/shared/http
 * @method fetchCommentsForPost
 * @param  {string}  id post ID/
 * @return {Response}     Fetch Response object
 */
export function fetchCommentsForPost(postId) {
    return fetch(`${process.env.ENDPOINT}/comments?postId=${postId}&_expand=user`);
}

/**
 * Creates a post with the given payload
 * @method createComment
 * @module letters/shared/http
 * @param  {object}   payload Post payload
 * @return {Response}           Fetch Response
 */
export function createComment(payload) {
    if (!payload) {
        throw new Error('You must provide a payload when creating a comment');
    }
    // Create options for the request
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Send the new post to the API
    return fetch(`${process.env.ENDPOINT}/comments`, requestOptions);
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
    return fetch(`${process.env.ENDPOINT}/likes`, {
        method: 'POST',
        body: JSON.stringify({ postId, userId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
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
    return fetch(`${process.env.ENDPOINT}/posts/${postId}/likes/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

/**
 * ensureUserAccount ensures that a user exists and creates the account for them if they don't have one already
 * @method ensureUserAccount
 * @param  {object} user User config object
 * @return {Response}
 */
export async function ensureUserAccount(user) {
    const existingUserResponse = await fetch(`${process.env.ENDPOINT}/users/${user.id}`);
    if (existingUserResponse.status === 404) {
        // Create options for the request
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // Send the new post to the API
        const newUserResponse = await fetch(`${process.env.ENDPOINT}/users`, requestOptions);
        return await newUserResponse;
    }
    return await existingUserResponse;
}
