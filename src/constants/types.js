export const providers = ['Github'];

export const app = {
    ERROR: 'letters-social/app/error',
    LOADED: 'letters-social/app/loaded',
    LOADING: 'letters-social/app/loading'
};

export const auth = {
    LOGIN_SUCCESS: 'letters-social/auth/login/success',
    LOGOUT_SUCCESS: 'letters-social/auth/logout/success'
};

export const posts = {
    CREATE: 'letters-social/post/create',
    GET: 'letters-social/post/get',
    LIKE: 'letters-social/post/like',
    NEXT: 'letters-social/post/paginate/next',
    UNLIKE: 'letters-social/post/unlike',
    UPDATE_LINKS: 'letters-social/post/paginate/update'
};

export const comments = {
    CREATE: 'letters-social/comments/create',
    GET: 'letters-social/comments/get',
    SHOW: 'letters-social/comments/show',
    TOGGLE: 'letters-social/comments/toggle'
};
