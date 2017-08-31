export default {
    error: null,
    loading: false,
    postIds: new Set(),
    posts: new Map(),
    pagination: {
        first: `${process.env.ENDPOINT}/posts?_page=1&_sort=date&_order=DESC&_embed=comments`,
        next: null,
        prev: null,
        last: null
    },
    user: {
        authenticated: false,
        email: null,
        avatar: null,
        id: null,
        name: null
    }
};
