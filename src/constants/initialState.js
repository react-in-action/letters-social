export default {
    error: null,
    loading: true,
    postIds: [],
    posts: {},
    commentIds: [],
    comments: {},
    pagination: {
        first: `${process.env
            .ENDPOINT}/posts?_page=1&_sort=date&_order=DESC&_embed=comments&_expand=user`,
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
