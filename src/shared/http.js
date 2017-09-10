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
export async function likePost(postId, userId) {
    // NOTE: we're using the new async/await style here; you can learn more about it at
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    // If you're unfamiliar with this style, you can easily re-write it using promise chains

    // Get the post to update and check to see if we've liked it already
    const getPost = await fetch(
        `${process.env.ENDPOINT}/posts/${postId}?_embed=comments&_expand=user&_embed=likes`
    );
    const post = await getPost.json();
    const alreadyLiked = post.likes.find(p => p.userId === userId);
    if (alreadyLiked) {
        return;
    }

    // Create a new like for the user/post
    const createLike = await fetch(`${process.env.ENDPOINT}/likes`, {
        method: 'POST',
        body: JSON.stringify({ postId, userId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Get the response in JSON format
    const like = await createLike.json();

    // Update the post locally if necessary
    post.likes.push(like.id);
    // Update the remote database and yield back a promise
    return await fetch(
        `${process.env.ENDPOINT}/posts/${postId}?_embed=comments&_expand=user&_embed=likes`,
        {
            method: 'PUT',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}

export async function unlikePost(postId, userId) {
    // Get the post to update and check to see if we've liked it already
    const getPost = await fetch(
        `${process.env.ENDPOINT}/posts/${postId}?_embed=comments&_expand=user&_embed=likes`
    );
    const post = await getPost.json();
    const existingLikeIndex = post.likes.map(like => like.userId).indexOf(userId);
    if (existingLikeIndex === -1) {
        return;
    }
    const postToDelete = post.likes[existingLikeIndex];
    // Remove the item from the array
    post.likes.splice(existingLikeIndex, 1);
    // Delete the old like
    await fetch(`${process.env.ENDPOINT}/likes/${postToDelete.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // Update the post
    return await fetch(
        `${process.env.ENDPOINT}/posts/${postId}?_embed=comments&_expand=user&_embed=likes`,
        {
            method: 'PUT',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
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
