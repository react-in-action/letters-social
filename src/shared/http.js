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
    return fetch(`${process.env.ENDPOINT}/posts?_expand=user`, requestOptions);
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
    return fetch(`${process.env.ENDPOINT}/posts/${id}?_embed=comments&_expand=user`);
}

/**
 * Fetch a post from the API
 * @module letters/shared/http
 * @method fetchCommentsForPost
 * @param  {string}  id post ID
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
export async function likePost(postId, userId) {
    // NOTE: we're using the new async/await style here; you can learn more about it at
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    // If you're unfamiliar with this style, you can easily re-write it using promise chains

    // Create a new like for the user/post
    const createLike = await fetch(`${process.env.ENDPOINT}/posts/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ postId, userId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Get the response in JSON format
    const like = await createLike.json();

    // Get the post to update
    const getPost = await fetch(`${process.env.ENDPOINT}/posts/${postId}`);
    const post = await getPost.json();
    if (post.likes.includes(like.id)) {
        return;
    }
    // Update the post locally if necessary
    post.likes.push(like.id);
    // Update the remote database and yield back a promise
    return await fetch(`${process.env.ENDPOINT}/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function unLikePost(postId, userId) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(`${process.env.ENDPOINT}/posts/${postId}/likes?userId=${userId}`, requestOptions);
}
