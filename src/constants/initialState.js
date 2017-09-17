/**
 * Initial state for the redux store
 * @type {Object}
 */
export default {
    error: null,
    loading: false,
    postIds: [],
    posts: {},
    commentIds: [],
    comments: {},
    pagination: {
        first: `${process.env
            .ENDPOINT}/posts?_page=1&_sort=date&_order=DESC&_embed=comments&_expand=user&_embed=likes`,
        next: null,
        prev: null,
        last: null
    },
    user: {
        authenticated: false,
        profilePicture: null,
        id: null,
        name: null,
        token: null
    }
};
