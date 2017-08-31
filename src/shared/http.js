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
    return fetch(`${process.env.ENDPOINT}/posts`, requestOptions);
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
    return fetch(`${process.env.ENDPOINT}/posts/${id}`);
}
